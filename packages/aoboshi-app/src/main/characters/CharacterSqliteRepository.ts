import { CharacterRepository } from "@vvornanen/aoboshi-core/characters/CharacterRepository";
import { Database } from "better-sqlite3";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";

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

export class CharacterSqliteRepository implements CharacterRepository {
  constructor(private db: Database) {}

  save(character: Character): void {
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
        id: character.literal.codePointAt(0),
        literal: character.literal,
        radical: character.radical,
        grade: character.grade,
        strokeCount: character.strokeCount,
        onyomi: JSON.stringify(character.onyomi),
        kunyomi: JSON.stringify(character.kunyomi),
        strokes: character.strokes || null,
      });
  }

  saveAll(characters: Character[]): void {
    characters.forEach((character) => this.save(character));
  }

  findByLiteral(literal: string): Character | null {
    const row = this.db
      .prepare("select * from Character where id = ?")
      .get(literal.codePointAt(0)) as CharacterRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  findAll(): Character[] {
    return (
      this.db.prepare("select * from Character").all() as CharacterRow[]
    ).map((row) => this.toEntity(row));
  }

  count(): number {
    return this.db
      .prepare("select count(*) from Character")
      .pluck()
      .get() as number;
  }

  existsByLiteral(literal: string): boolean {
    const count = this.db
      .prepare("select count(*) from Character where id = @id")
      .pluck()
      .get({ id: literal.codePointAt(0) }) as number;
    return count > 0;
  }

  deleteByLiteral(id: string): void {
    this.db
      .prepare("delete from Character where id = ? ")
      .run(id.codePointAt(0));
  }

  delete(character: Character): void {
    this.deleteByLiteral(character.literal);
  }

  deleteAll(): void {
    this.db.exec("delete from Character where true");
  }

  private toEntity(row: CharacterRow): Character {
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
