import { Character } from "~/characters";

/**
 * Creates a {@link Character} object for testing purposes.
 * Pass required properties and optionally other properties as the argument.
 * Fills rest of the properties with values.
 */
export const createCharacter = ({
  literal,
  ...value
}: Partial<Character> & Pick<Character, "literal">): Character => ({
  literal: literal,
  radical: null,
  grade: null,
  strokeCount: 0,
  references: [],
  onyomi: [],
  kunyomi: [],
  ...value,
});
