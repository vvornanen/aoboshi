import { Character, Grade } from "@vvornanen/aoboshi-core/characters/Character";

export const mockCharacter = ({
  literal,
  ...value
}: Partial<Character> & Pick<Character, "literal">): Character => ({
  literal: literal,
  radical: null,
  grade: Grade.Kyoiku1,
  strokeCount: 8,
  references: [],
  onyomi: [],
  kunyomi: [],
  ...value,
});
