import { Database } from "better-sqlite3";
import migration01 from "./01-books-structure";
import { Migration } from "./Migration";

export class MigrationService {
  constructor(private db: Database) {}

  run(): void {
    this.db.exec(`
        create table if not exists Migration
        (
            id        text primary key,
            timestamp text
        )
    `);

    const migrations: Migration[] = [migration01];

    migrations.forEach((migration) => {
      const { count } = this.db
        .prepare("select count(*) as count from Migration where id = ?")
        .get(migration.id) as { count: number };

      if (count > 0) {
        return;
      }

      console.log(`Run migration ${migration.id}`);
      migration.run(this.db);

      this.db
        .prepare(
          "insert into Migration (id, timestamp) values (@id, @timestamp)",
        )
        .run({
          id: migration.id,
          timestamp: new Date().toISOString(),
        });
    });
  }
}
