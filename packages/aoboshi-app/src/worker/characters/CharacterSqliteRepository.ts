import { Database } from "better-sqlite3";
import {
  Character,
  CharacterRepository,
  getCodePoint,
} from "@vvornanen/aoboshi-core/characters";
import { AbstractSqliteRepository, PreparedStatement } from "~/worker";

type CharacterRow = {
  id: number;
  literal: string;
  radical: string | null;
  grade: number | null;
  strokeCount: number;
  onyomi: string;
  kunyomi: string;
  strokes: string | null;
};

export class CharacterSqliteRepository
  extends AbstractSqliteRepository<Character, CharacterRow, number>
  implements CharacterRepository
{
  constructor(db: Database) {
    super(db, "Character");
  }

  findByLiteral(literal: string): Character | null {
    return this.findById(getCodePoint(literal));
  }

  existsByLiteral(literal: string): boolean {
    return this.existsById(getCodePoint(literal));
  }

  deleteByLiteral(literal: string): void {
    this.deleteById(getCodePoint(literal));
  }

  protected prepareSave(): PreparedStatement<CharacterRow> {
    return this.db.prepare(
      `
            insert into Character (id, literal, radical, grade, strokeCount, onyomi, kunyomi,
                                   strokes)
            values (@id, @literal, @radical, @grade, @strokeCount, @onyomi, @kunyomi, @strokes)
            on conflict do update set radical     = @radical,
                                      grade       = @grade,
                                      strokeCount = @strokeCount,
                                      onyomi      = @onyomi,
                                      kunyomi     = @kunyomi,
                                      strokes     = @strokes
        `,
    );
  }

  protected getId(entity: Character): number {
    return getCodePoint(entity.literal);
  }

  protected toEntity(row: CharacterRow): Character {
    return {
      literal: row.literal,
      radical: row.radical,
      grade: row.grade, // TODO: Handle invalid values
      strokeCount: row.strokeCount,
      references: [], // TODO: Not yet implemented
      onyomi: JSON.parse(row.onyomi),
      kunyomi: JSON.parse(row.kunyomi),
      strokes: row.strokes || undefined,
    };
  }

  protected toRow(entity: Character): CharacterRow {
    return {
      id: this.getId(entity),
      literal: entity.literal,
      radical: entity.radical,
      grade: entity.grade,
      strokeCount: entity.strokeCount,
      onyomi: JSON.stringify(entity.onyomi),
      kunyomi: JSON.stringify(entity.kunyomi),
      strokes: entity.strokes || null,
    };
  }
}
