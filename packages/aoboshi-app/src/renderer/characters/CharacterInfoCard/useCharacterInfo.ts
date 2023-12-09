import { Character, Grade } from "@vvornanen/aoboshi-core/characters/Character";

type CharacterInfoReturnValue = {
  data: Character | null;
};

/**
 * Fetches detailed info for the given character.
 *
 * @param literal character to fetch
 */
export const useCharacterInfo = (
  literal: string | null,
): CharacterInfoReturnValue => {
  if (!literal) {
    return { data: null };
  }

  const data: Character = {
    literal: literal,
    radical: null,
    grade: Grade.Kyoiku1,
    strokeCount: 8,
    references: [],
    onyomi: [],
    kunyomi: [],
  };

  return {
    data,
  };
};
