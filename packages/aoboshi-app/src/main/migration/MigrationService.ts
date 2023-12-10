import { join, parse, ParsedPath } from "node:path";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { Temporal } from "@js-temporal/polyfill";
import { MainApplicationContext } from "../MainApplicationContext";
import { OnAfterInit } from "../../worker/ApplicationContext";
import { Migration } from "./Migration";
import {
  ExecutedMigration,
  MigrationRepository,
  MigrationSqliteRepository,
} from "./MigrationSqliteRepository";

type MigrationFile = {
  id: string;
  path: string;
  hash: string;
};

const isMigration = (module: unknown): module is Migration => {
  return (
    module !== null &&
    typeof module === "object" &&
    typeof (module as Migration).run === "function"
  );
};

/**
 * Returns a sha1 hash of the contents of a file at the given path.
 *
 * @param path file path
 * @private
 */
const getContentHash = (path: string): string => {
  const fileBuffer = fs.readFileSync(path);
  const hashSum = createHash("sha1");
  hashSum.update(fileBuffer);

  return hashSum.digest("hex");
};

const getMigrationFiles = (): MigrationFile[] => {
  const migrationsDir = join(__dirname, "migrations");

  return fs
    .readdirSync(migrationsDir)
    .map((path) => [path, parse(path)] as [string, ParsedPath])
    .filter(([, parsedPath]) => parsedPath.ext === ".js")
    .map(([path, parsedPath]) => {
      const absolutePath = join(migrationsDir, path);
      return {
        id: parsedPath.name,
        path: absolutePath,
        hash: getContentHash(absolutePath),
      };
    });
};

const loadMigrationFile = async (
  migrationFile: MigrationFile,
): Promise<Migration> => {
  const migration = await import(migrationFile.path);

  if (isMigration(migration.default)) {
    return migration.default;
  } else {
    throw new Error(`Invalid migration: ${migrationFile.id}`);
  }
};

/** Predicate for migrations run only after application has been initialized */
const isAfterInit = (migration: MigrationFile) => migration.id.startsWith("A");

/** Predicate for migrations run during application initialization */
const notAfterInit = (migration: MigrationFile) => !isAfterInit(migration);

/**
 * Manages and applies changes to the database and other resources
 */
export class MigrationService implements OnAfterInit {
  private migrationRepository: MigrationRepository;

  constructor(private context: MainApplicationContext) {
    this.migrationRepository = new MigrationSqliteRepository(context.database);
  }

  /**
   * Reads migration files from the migrations directory and runs new migrations
   * and changed repeatable migrations.
   */
  async run(): Promise<void> {
    this.initMigrationsTable();

    const migrationFiles = getMigrationFiles().filter(notAfterInit);

    for (const migrationFile of migrationFiles) {
      await this.runMigration(migrationFile);
    }
  }

  async onAfterInit(): Promise<void> {
    const migrationFiles = getMigrationFiles().filter(isAfterInit);

    for (const migrationFile of migrationFiles) {
      await this.runMigration(migrationFile);
    }
  }

  private async runMigration(migrationFile: MigrationFile): Promise<void> {
    const migration = await loadMigrationFile(migrationFile);

    const executedMigration = this.migrationRepository.findById(
      migrationFile.id,
    );

    if (!executedMigration) {
      console.info(
        `Run migration ${migrationFile.id}: ${migration.description}`,
      );
      await migration.run(this.context);

      this.saveExecutedMigration({
        id: migrationFile.id,
        description: migration.description,
        hash: migrationFile.hash,
      });

      return;
    }

    const hashChanged = executedMigration.hash !== migrationFile.hash;

    if (hashChanged && migration.repeatable) {
      console.info(`Rerun changed migration ${migrationFile.id}`);
      await migration.run(this.context);

      this.saveExecutedMigration({
        id: migrationFile.id,
        description: migration.description,
        hash: migrationFile.hash,
      });
    } else if (hashChanged) {
      console.warn(
        `Migration file has changed after it was run: ${migrationFile.id}`,
      );
    } else {
      console.debug(`Migration already run: ${migrationFile.id}`);
    }
  }

  private initMigrationsTable(): void {
    this.context.database.exec(`
        create table if not exists Migration
        (
            id          text primary key,
            description text not null,
            hash        text not null,
            timestamp   text not null
        )
    `);
  }

  private saveExecutedMigration(
    migration: Omit<ExecutedMigration, "timestamp">,
  ): void {
    this.migrationRepository.save({
      id: migration.id,
      description: migration.description,
      hash: migration.hash,
      timestamp: Temporal.Now.zonedDateTimeISO().toString(),
    });
  }
}
