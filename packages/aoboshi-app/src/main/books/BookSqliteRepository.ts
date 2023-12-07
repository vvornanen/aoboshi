import { Database } from "better-sqlite3";
import { Book } from "@vvornanen/aoboshi-core/books/Book";
import { BookRepository } from "@vvornanen/aoboshi-core/books/BookRepository";

type BookRow = {
  id: string;
  title: string;
  titleShort: string;
  volumes: string;
};

export class BookSqliteRepository implements BookRepository {
  constructor(private db: Database) {}

  save(book: Book): void {
    this.db
      .prepare(
        `
            insert into Book (id, title, titleShort, volumes)
            values (@id, @title, @titleShort, @volumes)
            on conflict do update set title = @title,
                                      titleShort = @titleShort,
                                      volumes = @volumes
        `,
      )
      .run({
        id: book.id,
        title: book.title,
        titleShort: book.titleShort,
        volumes: JSON.stringify(book.volumes),
      });
  }

  findById(id: string): Book | null {
    const row = this.db.prepare("select * from Book where id = ?").get(id) as
      | BookRow
      | undefined;
    return row ? this.toEntity(row) : null;
  }

  findAll(): Book[] {
    return (this.db.prepare("select * from Book").all() as BookRow[]).map(
      (row) => this.toEntity(row),
    );
  }

  count(): number {
    const result = this.db
      .prepare("select count(*) as count from Book")
      .get() as { count: number };
    return result.count;
  }

  deleteById(id: string): void {
    this.db.prepare("delete from Book where id = ? ").run(id);
  }

  delete(book: Book): void {
    this.deleteById(book.id);
  }

  private toEntity(row: BookRow): Book {
    return { ...row, volumes: JSON.parse(row.volumes) };
  }
}
