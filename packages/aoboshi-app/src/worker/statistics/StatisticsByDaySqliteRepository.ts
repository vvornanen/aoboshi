import { Database } from "better-sqlite3";
import {
  StatisticsByDay,
  StatisticsByDayRepository,
} from "@vvornanen/aoboshi-core/statistics/day";
import { AbstractSqliteRepository } from "~/worker";

type StatisticsByDayRow = {
  id: string;
  date: string;
  addedCharacters: string;
  firstSeenCharacters: string;
  reviewedCharacters: string;
  numberOfAddedCharacters: number;
  numberOfFirstSeenCharacters: number;
  numberOfReviewedCharacters: number;
  numberOfReviews: number;
};

export class StatisticsByDaySqliteRepository
  extends AbstractSqliteRepository<StatisticsByDay, StatisticsByDayRow, string>
  implements StatisticsByDayRepository
{
  constructor(db: Database) {
    super(db, "StatisticsByDay");
  }

  save(entity: StatisticsByDay) {
    this.db
      .prepare(
        `
            insert into StatisticsByDay (id, date, addedCharacters, firstSeenCharacters, reviewedCharacters, numberOfAddedCharacters, numberOfFirstSeenCharacters, numberOfReviewedCharacters, numberOfReviews)
            values (@id, @date, @addedCharacters, @firstSeenCharacters, @reviewedCharacters, @numberOfAddedCharacters, @numberOfFirstSeenCharacters, @numberOfReviewedCharacters, @numberOfReviews)
            on conflict do update set date = @date,
                                      addedCharacters = @addedCharacters,
                                      firstSeenCharacters = @firstSeenCharacters,
                                      reviewedCharacters = @reviewedCharacters,
                                      numberOfAddedCharacters = @numberOfAddedCharacters,
                                      numberOfFirstSeenCharacters = @numberOfFirstSeenCharacters,
                                      numberOfReviewedCharacters = @numberOfReviewedCharacters,
                                      numberOfReviews = @numberOfReviews
        `,
      )
      .run(entity);
  }

  findByDate(date: string): StatisticsByDay | null {
    const row = this.db
      .prepare(
        `select *
                from StatisticsByDay
                where date = ?`,
      )
      .get(date) as StatisticsByDayRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  protected getId(entity: StatisticsByDay) {
    return entity.id;
  }

  protected toEntity(row: StatisticsByDayRow) {
    return { ...row };
  }
}
