import BetterSqlite3 from "better-sqlite3";

export const getDatabase = (
  file: string,
  verboseLogging: boolean = false,
): BetterSqlite3.Database => {
  console.log(`Connecting to ${file}`);
  return new BetterSqlite3(file, {
    verbose: verboseLogging ? console.log : undefined,
  });
};
