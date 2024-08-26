import { Database } from "better-sqlite3";
import {
  StatisticsByCharacter,
  StatisticsByCharacterRepository,
} from "@vvornanen/aoboshi-core/statistics/character";
import { AbstractSqliteRepository, PreparedStatement } from "~/worker";

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

  protected prepareSave(): PreparedStatement<StatisticsByCharacterRow> {
    return this.db.prepare<unknown[], StatisticsByCharacterRow>(
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
    );
  }

  protected getId(entity: StatisticsByCharacter) {
    return entity.id;
  }

  protected toEntity(row: StatisticsByCharacterRow): StatisticsByCharacter {
    return row;
  }

  protected toRow(entity: StatisticsByCharacter): StatisticsByCharacterRow {
    return entity;
  }
}
