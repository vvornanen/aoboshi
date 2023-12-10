import { MainApplicationContext } from "../MainApplicationContext";

export interface Migration {
  /** A short description about the changes contained in this migration */
  description: string;

  /** If true, the migration is re-run when the content changes */
  repeatable?: boolean;

  /** Apply the changes in this migration to the given application context */
  run(context: MainApplicationContext): void | Promise<void>;
}
