import path from "path";
import { app } from "electron";
import { Database } from "better-sqlite3";
import { BookRepository } from "@vvornanen/aoboshi-core/books/BookRepository";
import { CharacterRepository } from "@vvornanen/aoboshi-core/characters/CharacterRepository";
import { getDatabase } from "./database";
import { BookSqliteRepository } from "./books/BookSqliteRepository";
import { CharacterSqliteRepository } from "./characters/CharacterSqliteRepository";

/**
 * Services may implement this interface if they need to call other services
 * when the application context is ready for use.
 */
export interface OnAfterInit {
  /**
   * Called when all services in the application context are ready for use
   */
  onAfterInit: () => void;
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

  constructor() {
    const dbFilename =
      process.env.DB_FILENAME ||
      path.join(app.getPath("userData"), "aoboshi.db");
    this.database = getDatabase(dbFilename, true);

    this.bookRepository = new BookSqliteRepository(this.database);
    this.characterRepository = new CharacterSqliteRepository(this.database);
  }

  onAfterInit(): void {
    console.log("Application initialized");

    Object.values(this).forEach((service) => {
      if (hasOnAfterInit(service)) {
        service.onAfterInit();
      }
    });
  }
}

let applicationContext: ApplicationContext | null = null;

export const getApplicationContext = (): ApplicationContext => {
  if (!applicationContext) {
    console.log("Create new application context");
    applicationContext = new ApplicationContext();
  }

  return applicationContext;
};
