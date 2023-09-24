export const KANJI_REGEXP = /[一-龯]/;
export const KANA_REGEXP = /[ぁ-んァ-ン]/;

export enum JLPT {
  N1 = "N1",
  N2 = "N2",
  N3 = "N3",
  N4 = "N4",
  N5 = "N5",
}

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

/** Detailed info about a single character */
export type CharacterInfo = {
  literal: string;
  radical: number | null;
  grade: Grade | null;
  jlpt: JLPT | null;
  strokeCount: number;
  frequency: number | null;
  references: Record<string, string>;
  onyomi: string[];
  kunyomi: string[];
};
