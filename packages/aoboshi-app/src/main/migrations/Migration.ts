import { Database } from "better-sqlite3";

export interface Migration {
  id: string;
  run(db: Database): void;
}
