import { Repository } from "@vvornanen/aoboshi-core";
import { Database } from "better-sqlite3";
import { AbstractSqliteRepository, PreparedStatement } from "~/worker";

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

  protected prepareSave(): PreparedStatement<ExecutedMigration> {
    return this.db.prepare(
      `
            insert into Migration (id, description, hash, timestamp)
            values (@id, @description, @hash, @timestamp)
            on conflict do update set description = @description,
                                      hash = @hash,
                                      timestamp = @timestamp`,
    );
  }

  protected getId(migration: ExecutedMigration): string {
    return migration.id;
  }

  protected toRow(migration: ExecutedMigration): ExecutedMigration {
    return {
      id: migration.id,
      description: migration.description,
      hash: migration.hash,
      timestamp: migration.timestamp,
    };
  }

  protected toEntity(row: ExecutedMigration): ExecutedMigration {
    return row;
  }
}
