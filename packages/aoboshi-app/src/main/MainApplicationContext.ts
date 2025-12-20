import path from "path";
import { app } from "electron";
import { ApplicationMenu, MainWindow, Scheduler } from "~/main";
import { BookController } from "~/main/books";
import { CharacterController } from "~/main/characters";
import {
  ApplicationContext,
  ApplicationProperties,
  getEnvironmentVariable,
} from "~/worker";
import { StatisticsController } from "~/main/statistics";

/** Extends the common application context with services available only in the main thread */
export class MainApplicationContext extends ApplicationContext {
  applicationMenu: ApplicationMenu;
  mainWindow: MainWindow;
  scheduler: Scheduler;
  bookController: BookController;
  characterController: CharacterController;
  statisticsController: StatisticsController;

  constructor(properties: ApplicationProperties) {
    super(properties);

    this.scheduler = new Scheduler(this);

    this.applicationMenu = new ApplicationMenu(
      {
        sidebarOpen: true,
        devToolsEnabled: true,
        mainWindowFocused: false,
        fullscreen: false,
      },
      this.bookRepository,
      this.scheduler,
    );

    this.mainWindow = new MainWindow(this);
    this.bookController = new BookController(this.bookRepository);
    this.characterController = new CharacterController(
      this.characterRepository,
    );
    this.statisticsController = new StatisticsController(
      this.statisticsIncrementRepository,
    );
  }
}

let applicationContext: MainApplicationContext | null = null;

export const getMainApplicationContext = (): MainApplicationContext => {
  if (!applicationContext) {
    console.log("Creating main application context");

    // Main application context is used only in the main process,
    // so it is safe to default to values provided by the Electron API
    const properties: ApplicationProperties = {
      dbFilename: path.resolve(
        getEnvironmentVariable(
          "DB_FILENAME",
          path.join(app.getPath("userData"), "aoboshi.db"),
        ),
      ),
      logLevel: getEnvironmentVariable("LOGLEVEL", "info"),
      resourcesPath:
        process.env.NODE_ENV === "development"
          ? path.join(import.meta.dirname, "../../src/resources")
          : process.resourcesPath,
    };

    applicationContext = new MainApplicationContext(properties);
  }

  return applicationContext;
};
