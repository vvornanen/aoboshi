/**
 * Card review data grouped and cached by book chapter.
 */
export type StatisticsByChapter = {
  id: string;

  /** Refers to a {@link Book}. */
  bookId: string;

  /** Refers to a {@link Chapter} within the book referred by `bookId`. */
  chapterId: string;

  /**
   * String containing characters in this chapter having at least one review.
   */
  seenCharacters: string;

  /**
   * String containing characters in this chapter that are present on at least
   * one card but have not yet been reviewed.
   */
  newCharacters: string;

  /**
   * String containing characters in this chapter with no cards and zero reviews.
   */
  unseenCharacters: string;

  /**
   * Number of characters in this chapter having at least one review.
   *
   * Note that due to multibyte characters, this value may be different
   * from `seenCharacters` length.
   */
  numberOfSeenCharacters: number;

  /**
   * Number of characters in this chapter that are present on at least one card
   * but have not yet been reviewed.
   *
   * Note that due to multibyte characters, this value may be different
   * from `newCharacters` length.
   */
  numberOfNewCharacters: number;

  /**
   * Number of characters in this chapter with no cards and zero reviews.
   *
   * Note that due to multibyte characters, this value may be different
   * from `unseenCharacters` length.
   */
  numberOfUnseenCharacters: number;

  /**
   * Total number of characters in this chapter.
   */
  totalNumberOfCharacters: number;
};
