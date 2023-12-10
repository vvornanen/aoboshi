import { Repository } from "@vvornanen/aoboshi-core/Repository";
import { Database } from "better-sqlite3";
import { AbstractSqliteRepository } from "../../worker/AbstractSqliteRepository";

export type ExecutedMigration = {
  id: string;
  description: string;
  hash: string;
  timestamp: string;
};

export interface MigrationRepository
  extends Repository<ExecutedMigration, string> {}

export class MigrationSqliteRepository
  extends AbstractSqliteRepository<ExecutedMigration, ExecutedMigration, string>
  implements MigrationRepository
{
  constructor(db: Database) {
    super(db, "Migration");
  }

  save(migration: ExecutedMigration): void {
    this.db
      .prepare(
        `
            insert into Migration (id, description, hash, timestamp)
            values (@id, @description, @hash, @timestamp)
            on conflict do update set description = @description,
                                      hash = @hash,
                                      timestamp = @timestamp`,
      )
      .run({
        id: migration.id,
        description: migration.description,
        hash: migration.hash,
        timestamp: migration.timestamp,
      });
  }

  protected getId(migration: ExecutedMigration): string {
    return migration.id;
  }

  protected toEntity(row: ExecutedMigration): ExecutedMigration {
    return row;
  }
}
