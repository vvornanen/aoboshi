/** Hierarchically organized collection of characters */
export type Book = {
  /** A randomly generated unique identifier of this book */
  id: string;

  /** Schema version. Used for migrations when the data is persisted. */
  version: number;

  /** Long book title displayed in headings */
  title: string;

  /** Shortened book title is used in navigation */
  titleShort: string;

  /** Book content is organized hierarchically into volumes, chapters and characters */
  volumes: Volume[];
};

/** The first hierarchy level. Books are split into volumes. */
export type Volume = {
  /** A randomly generated unique identifier of this volume */
  id: string;
  title: string;
  chapters: Chapter[];
};

/** The second hierarchy level. Volumes are split into chapters. */
export type Chapter = {
  /** A randomly generated unique identifier of this chapter */
  id: string;

  /** Used as an identifier in character references */
  code: string;

  /** Chapter title */
  title: string;

  /** Chapter subtitle */
  subtitle?: string;

  /**
   * Characters contained in this chapter.
   *
   * Either a string of character literals or more detailed character data as an array of Character objects.
   */
  characters: string | Character[];
};

/** Information about a single character */
export type Character = {
  /** Character index number used in this book */
  n: number;

  /** Character literal */
  literal: string;
};
