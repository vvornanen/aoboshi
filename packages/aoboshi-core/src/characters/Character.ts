export const KANJI_REGEXP = /[一-龯]/;
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
