import { Database } from "better-sqlite3";
import { Book, BookRepository } from "@vvornanen/aoboshi-core/books";
import { AbstractSqliteRepository, PreparedStatement } from "~/worker/";

type BookRow = {
  id: string;
  title: string;
  titleShort: string;
  volumes: string;
};

export class BookSqliteRepository
  extends AbstractSqliteRepository<Book, BookRow, string>
  implements BookRepository
{
  constructor(db: Database) {
    super(db, "Book");
  }

  protected prepareSave(): PreparedStatement<BookRow> {
    return this.db.prepare(
      `
            insert into Book (id, title, titleShort, volumes)
            values (@id, @title, @titleShort, @volumes)
            on conflict do update set title = @title,
                                      titleShort = @titleShort,
                                      volumes = @volumes
        `,
    );
  }

  protected getId(entity: Book): string {
    return entity.id;
  }

  protected toEntity(row: BookRow): Book {
    return { ...row, volumes: JSON.parse(row.volumes) };
  }

  protected toRow(entity: Book): BookRow {
    return {
      id: entity.id,
      title: entity.title,
      titleShort: entity.titleShort,
      volumes: JSON.stringify(entity.volumes),
    };
  }
}
