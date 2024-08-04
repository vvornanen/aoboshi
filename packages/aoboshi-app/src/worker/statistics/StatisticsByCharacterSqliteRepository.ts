import { Database } from "better-sqlite3";
import {
  StatisticsByCharacter,
  StatisticsByCharacterRepository,
} from "@vvornanen/aoboshi-core/statistics/character";
import { AbstractSqliteRepository } from "~/worker";

type StatisticsByCharacterRow = {
  id: string;
  literal: string;
  firstAdded: string | null;
  firstReviewed: string | null;
  lastReviewed: string | null;
  numberOfReviews: number;
  numberOfCards: number;
};

export class StatisticsByCharacterSqliteRepository
  extends AbstractSqliteRepository<
    StatisticsByCharacter,
    StatisticsByCharacterRow,
    string
  >
  implements StatisticsByCharacterRepository
{
  constructor(db: Database) {
    super(db, "StatisticsByCharacter");
  }

  save(entity: StatisticsByCharacter) {
    this.db
      .prepare(
        `
            insert into StatisticsByCharacter (id, literal, firstAdded,
                                               firstReviewed, lastReviewed,
                                               numberOfReviews, numberOfCards)
            values (@id, @literal, @firstAdded, @firstReviewed, @lastReviewed,
                    @numberOfReviews, @numberOfCards)
            on conflict do update set literal         = @literal,
                                      firstAdded      = @firstAdded,
                                      firstReviewed   = @firstReviewed,
                                      lastReviewed    = @lastReviewed,
                                      numberOfReviews = @numberOfReviews,
                                      numberOfCards   = @numberOfCards
        `,
      )
      .run(entity);
  }

  findByLiteral(literal: string): StatisticsByCharacter | null {
    const row = this.db
      .prepare(
        `select *
                from StatisticsByCharacter
                where literal = ?`,
      )
      .get(literal) as StatisticsByCharacterRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  protected getId(entity: StatisticsByCharacter) {
    return entity.id;
  }

  protected toEntity(row: StatisticsByCharacterRow) {
    return { ...row };
  }
}
