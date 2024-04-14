/**
 * Card review data grouped and cached by day.
 */
export type StatisticsByDay = {
  id: string;

  /** ISO 8601 date string */
  date: Date;

  /** String containing new characters added to the deck on this day */
  addedCharacters: string;

  /** String containing characters reviewed first time on this day */
  firstSeenCharacters: string;

  /** String containing all characters reviewed on this day */
  reviewedCharacters: string;

  /**
   * Number of new characters added to the deck on this day.
   *
   * Note that due to multibyte characters, this value may be different
   * from `addedCharacters` length.
   */
  numberOfAddedCharacters: number;

  /**
   * Number of characters reviewed first time on this day.
   *
   * Note that due to multibyte characters, this value may be different
   * from `firstSeenCharacters` length.
   */
  numberOfFirstSeenCharacters: number;

  /**
   * Number of all characters reviewed on this day.
   *
   * Note that due to multibyte characters, this value may be different
   * from `reviewedCharacters` length.
   */
  numberOfReviewedCharacters: number;

  /**
   * Number of cards reviewed on this day.
   *
   * The same card reviewed twice on the same day counts as two reviews.
   */
  numberOfReviews: number;
};
