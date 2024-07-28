/** Matches all kanji characters in Unicode 15.1 */
export const KANJI_REGEXP =
  /[\u3400-\u9FFF\uF900-\uFAFF\u{20000}-\u{37FFF}々]/u;
export const KANA_REGEXP = /[ぁ-んァ-ン]/;

/**
 * Grade classification codes used in Kanjidic.
 *
 * @see http://www.edrdg.org/wiki/index.php/KANJIDIC_Project
 */
export enum Grade {
  Kyoiku1 = 1,
  Kyoiku2 = 2,
  Kyoiku3 = 3,
  Kyoiku4 = 4,
  Kyoiku5 = 5,
  Kyoiku6 = 6,
  Joyo = 8,
  Jinmeiyo = 9,
  JinmeiyoVariant = 10,
}

/**
 * Returns the unicode code point value of the given character
 *
 * @param literal a single character
 */
export const getCodePoint = (literal: string): number => {
  const codePoint = literal.codePointAt(0);

  if (!codePoint) {
    throw new Error(`Literal must not be empty`);
  } else if ([...literal].length !== 1) {
    throw new Error(`Expected single character but got [${literal}]`);
  }

  return codePoint;
};

/**
 * Detailed information about a single character.
 *
 * Typically, a kanji but supports other kinds of characters as well.
 */
export type Character = {
  /** Character literal */
  literal: string;

  /** Radical literal */
  radical: string | null;

  /** Kanjidic grade classification */
  grade: Grade | null;

  /** Number of strokes. It should match with `strokes` data. */
  strokeCount: number;

  /** References to books where the character appears in the user's library */
  references: Reference[];

  /** Character readings */
  onyomi: string[];

  /** Character readings */
  kunyomi: string[];

  /** KanjiVG svg data for character strokes */
  strokes?: string;
};

/**
 * Indicates that the character appears in a specific chapter within a book in the user's library.
 */
export type Reference = {
  bookId: string;
  chapterId: string;
  chapterCode: string;
};

export type CharacterUpdateValue = Partial<Character> &
  Pick<Character, "literal">;
