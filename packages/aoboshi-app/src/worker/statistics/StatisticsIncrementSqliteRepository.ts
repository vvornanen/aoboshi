import {
  StatisticsIncrement,
  StatisticsIncrementRepository,
} from "@vvornanen/aoboshi-core/statistics";
import { Database } from "better-sqlite3";
import { AbstractSqliteRepository } from "~/worker";

type StatisticsIncrementRow = {
  id: string;
  start: string | null;
  end: string | null;
  numberOfReviews: number;
  numberOfNewCards: number;
  duration: number;
};

export class StatisticsIncrementSqliteRepository
  extends AbstractSqliteRepository<
    StatisticsIncrement,
    StatisticsIncrementRow,
    string
  >
  implements StatisticsIncrementRepository
{
  constructor(db: Database) {
    super(db, "StatisticsIncrement");
  }

  save(entity: StatisticsIncrement) {
    this.db
      .prepare(
        `
            insert into StatisticsIncrement (id, start, end, numberOfReviews,
                                             numberOfNewCards, duration)
            values (@id, @start, @end, @numberOfReviews, @numberOfNewCards,
                    @duration)
            on conflict do update set start            = @start,
                                      end              = @end,
                                      numberOfReviews  = @numberOfReviews,
                                      numberOfNewCards = @numberOfNewCards,
                                      duration         = @duration
        `,
      )
      .run(entity);
  }

  findLatest() {
    const row = this.db
      .prepare(`select * from StatisticsIncrement order by end desc limit 1`)
      .get() as StatisticsIncrementRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  protected getId(entity: StatisticsIncrement) {
    return entity.id;
  }

  protected toEntity(row: StatisticsIncrementRow) {
    return { ...row };
  }
}
