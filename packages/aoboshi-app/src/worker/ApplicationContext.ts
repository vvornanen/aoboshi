import { Database } from "better-sqlite3";
import { BookRepository } from "@vvornanen/aoboshi-core/books";
import { CharacterRepository } from "@vvornanen/aoboshi-core/characters";
import { AnkiClient } from "@vvornanen/aoboshi-anki";
import {
  StatisticsIncrementRepository,
  StatisticsService,
} from "@vvornanen/aoboshi-core/statistics";
import {
  CharacterAnalyzer,
  StatisticsByCharacterRepository,
} from "@vvornanen/aoboshi-core/statistics/character";
import {
  DayAnalyzer,
  StatisticsByDayRepository,
} from "@vvornanen/aoboshi-core/statistics/day";
import {
  ChapterAnalyzer,
  StatisticsByChapterRepository,
} from "@vvornanen/aoboshi-core/statistics/chapter";
import { getDatabase } from "./database";
import { BookSqliteRepository } from "./books";
import { CharacterSqliteRepository } from "./characters";
import { ApplicationProperties, getEnvironmentVariable } from "~/worker";
import { AnkiService } from "~/worker/anki";
import {
  StatisticsByChapterSqliteRepository,
  StatisticsByCharacterSqliteRepository,
  StatisticsByDaySqliteRepository,
  StatisticsIncrementSqliteRepository,
  createAnkiCardStatisticsAdapter,
} from "~/worker/statistics";

/**
 * Services may implement this interface if they need to call other services
 * when the application context is ready for use.
 */
export interface OnAfterInit {
  /**
   * Called when all services in the application context are ready for use
   */
  onAfterInit: () => void | Promise<void>;
}

const hasOnAfterInit = (service: unknown): service is OnAfterInit => {
  return (
    service !== null &&
    typeof service === "object" &&
    typeof (service as OnAfterInit).onAfterInit === "function"
  );
};

/**
 * Wires up all services depending on each other.
 */
export class ApplicationContext implements OnAfterInit {
  database: Database;
  bookRepository: BookRepository;
  characterRepository: CharacterRepository;
  ankiClient: AnkiClient;
  ankiService: AnkiService;
  statisticsIncrementRepository: StatisticsIncrementRepository;
  statisticsByCharacterRepository: StatisticsByCharacterRepository;
  statisticsByDayRepository: StatisticsByDayRepository;
  statisticsByChapterRepository: StatisticsByChapterRepository;
  statisticsService: StatisticsService;

  constructor(public properties: ApplicationProperties) {
    this.database = getDatabase(
      properties.dbFilename,
      properties.logLevel === "trace",
    );

    // Core repositories
    this.bookRepository = new BookSqliteRepository(this.database);
    this.characterRepository = new CharacterSqliteRepository(this.database);

    // Anki integration
    this.ankiClient = new AnkiClient(
      properties.anki.url,
      properties.anki.apiKey,
    );
    this.ankiService = new AnkiService(
      this.ankiClient,
      properties.anki.deckName,
    );
    const ankiCardStatisticsAdapter = createAnkiCardStatisticsAdapter(
      this.ankiService,
    );

    // Statistics
    this.statisticsIncrementRepository =
      new StatisticsIncrementSqliteRepository(this.database);
    this.statisticsByCharacterRepository =
      new StatisticsByCharacterSqliteRepository(this.database);
    this.statisticsByDayRepository = new StatisticsByDaySqliteRepository(
      this.database,
    );
    this.statisticsByChapterRepository =
      new StatisticsByChapterSqliteRepository(this.database);

    this.statisticsService = new StatisticsService(
      [
        new CharacterAnalyzer(
          this.statisticsByCharacterRepository,
          ankiCardStatisticsAdapter,
        ),
        new DayAnalyzer(this.statisticsByDayRepository),
        new ChapterAnalyzer(
          this.bookRepository,
          this.statisticsByChapterRepository,
        ),
      ],
      this.statisticsIncrementRepository,
    );
  }

  async onAfterInit(): Promise<void> {
    console.log("Application initialized");

    await Promise.all(
      Object.values(this).map((service) => {
        if (hasOnAfterInit(service)) {
          return service.onAfterInit();
        }
      }),
    );
  }
}

let applicationContext: ApplicationContext | null = null;

export const getApplicationContext = (): ApplicationContext => {
  if (!applicationContext) {
    console.log("Creating application context");

    // Electron API is not available in worker threads, so all properties
    // must be passed as environment variables
    const properties: ApplicationProperties = {
      dbFilename: getEnvironmentVariable("DB_FILENAME"),
      resourcesPath: getEnvironmentVariable("RESOURCES_PATH"),
      logLevel: getEnvironmentVariable("LOGLEVEL"),
      anki: {
        url: getEnvironmentVariable("ANKI_URL"),
        apiKey: getEnvironmentVariable("ANKI_API_KEY"),
        deckName: getEnvironmentVariable("ANKI_DECK_NAME"),
      },
    };

    applicationContext = new ApplicationContext(properties);
  }

  return applicationContext;
};
