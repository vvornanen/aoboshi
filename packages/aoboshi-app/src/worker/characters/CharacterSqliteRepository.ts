import { CharacterRepository } from "@vvornanen/aoboshi-core/characters/CharacterRepository";
import { Database } from "better-sqlite3";
import {
  Character,
  getCodePoint,
} from "@vvornanen/aoboshi-core/characters/Character";
import { AbstractSqliteRepository } from "../AbstractSqliteRepository";

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

  save(character: Character): void {
    try {
      this.db
        .prepare(
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
        )
        .run({
          id: this.getId(character),
          literal: character.literal,
          radical: character.radical,
          grade: character.grade,
          strokeCount: character.strokeCount,
          onyomi: JSON.stringify(character.onyomi),
          kunyomi: JSON.stringify(character.kunyomi),
          strokes: character.strokes || null,
        });
    } catch (error) {
      console.error(error);
      throw new Error(`Could not save character [${character.literal}]`);
    }
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
}
