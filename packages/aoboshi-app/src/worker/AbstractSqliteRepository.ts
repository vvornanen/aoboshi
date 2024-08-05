import { Repository } from "@vvornanen/aoboshi-core";
import { Database } from "better-sqlite3";

export type PreparedStatement<R> = { run: (row: R) => void };

/**
 * Generic implementation for storing entities in an SQLite database.
 */
export abstract class AbstractSqliteRepository<T, R, ID>
  implements Repository<T, ID>
{
  protected constructor(
    protected db: Database,
    protected tableName: string,
  ) {}

  save(entity: T): void {
    const statement = this.prepareSave();
    statement.run(this.toRow(entity));
  }

  saveAll(entities: T[]): void {
    const statement = this.prepareSave();
    entities.forEach((entity) => statement.run(this.toRow(entity)));
  }

  findById(id: ID): T | null {
    const row = this.db
      .prepare(`select * from ${this.tableName} where id = ?`)
      .get(id) as R | undefined;
    return row ? this.toEntity(row) : null;
  }

  findAll(): T[] {
    return (
      this.db.prepare(`select * from ${this.tableName}`).all() as R[]
    ).map((row) => this.toEntity(row));
  }

  count(): number {
    return this.db
      .prepare(`select count(*) from ${this.tableName}`)
      .pluck()
      .get() as number;
  }

  existsById(id: ID): boolean {
    const count = this.db
      .prepare(`select count(*) from ${this.tableName} where id = ?`)
      .pluck()
      .get(id) as number;
    return count > 0;
  }

  deleteById(id: ID): void {
    this.db.prepare(`delete from ${this.tableName} where id = ? `).run(id);
  }

  delete(entity: T): void {
    this.deleteById(this.getId(entity));
  }

  deleteAll(): void {
    this.db.exec(`delete from ${this.tableName} where true`);
  }

  protected abstract prepareSave(): PreparedStatement<R>;

  protected abstract getId(entity: T): ID;

  protected abstract toEntity(row: R): T;

  protected abstract toRow(entity: T): R;
}
