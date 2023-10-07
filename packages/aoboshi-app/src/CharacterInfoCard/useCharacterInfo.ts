import { CharacterInfo, Grade } from "./CharacterInfo";

type CharacterInfoReturnValue = {
  data: CharacterInfo | null;
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

  const data: CharacterInfo = {
    literal: literal,
    radical: null,
    grade: Grade.Kyoiku1,
    jlpt: null,
    strokeCount: 8,
    frequency: null,
    references: {},
    onyomi: [],
    kunyomi: [],
  };

  return {
    data,
  };
};
