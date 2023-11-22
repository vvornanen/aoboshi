import BetterSqlite3 from "better-sqlite3";
import { MigrationService } from "../migrations/MigrationService";

export const getDatabase = (
  file: string,
  verboseLogging: boolean = false,
): BetterSqlite3.Database => {
  console.log(`Connecting to ${file}`);
  const db = new BetterSqlite3(file, {
    verbose: verboseLogging ? console.log : undefined,
  });

  const migrationService = new MigrationService(db);
  migrationService.run();

  return db;
};
