import { Database } from "better-sqlite3";
import {
  StatisticsByChapter,
  StatisticsByChapterRepository,
} from "@vvornanen/aoboshi-core/statistics/chapter";
import { AbstractSqliteRepository, PreparedStatement } from "~/worker";

type StatisticsByChapterRow = {
  id: string;
  bookId: string;
  chapterId: string;
  seenCharacters: string;
  newCharacters: string;
  unseenCharacters: string;
  numberOfSeenCharacters: number;
  numberOfNewCharacters: number;
  numberOfUnseenCharacters: number;
  totalNumberOfCharacters: number;
};

export class StatisticsByChapterSqliteRepository
  extends AbstractSqliteRepository<
    StatisticsByChapter,
    StatisticsByChapterRow,
    string
  >
  implements StatisticsByChapterRepository
{
  constructor(db: Database) {
    super(db, "StatisticsByChapter");
  }

  findByChapter(chapterId: string): StatisticsByChapter | null {
    const row = this.db
      .prepare(
        `select *
       from StatisticsByChapter
       where chapterId = ?`,
      )
      .get(chapterId) as StatisticsByChapterRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  protected prepareSave(): PreparedStatement<StatisticsByChapterRow> {
    return this.db.prepare(
      `
            insert into StatisticsByChapter (id, bookId, chapterId,
                                             seenCharacters, newCharacters,
                                             unseenCharacters,
                                             numberOfSeenCharacters,
                                             numberOfNewCharacters,
                                             numberOfUnseenCharacters,
                                             totalNumberOfCharacters)
            values (@id, @bookId, @chapterId, @seenCharacters, @newCharacters,
                    @unseenCharacters, @numberOfSeenCharacters,
                    @numberOfNewCharacters, @numberOfUnseenCharacters,
                    @totalNumberOfCharacters)
            on conflict do update set bookId                   = @bookId,
                                      chapterId                = @chapterId,
                                      seenCharacters           = @seenCharacters,
                                      newCharacters            = @newCharacters,
                                      unseenCharacters         = @unseenCharacters,
                                      numberOfSeenCharacters   = @numberOfSeenCharacters,
                                      numberOfNewCharacters    = @numberOfNewCharacters,
                                      numberOfUnseenCharacters = @numberOfUnseenCharacters,
                                      totalNumberOfCharacters  = @totalNumberOfCharacters
        `,
    );
  }

  protected getId(entity: StatisticsByChapter) {
    return entity.id;
  }

  protected toEntity(row: StatisticsByChapterRow): StatisticsByChapter {
    return row;
  }

  protected toRow(entity: StatisticsByChapter): StatisticsByChapterRow {
    return entity;
  }
}
