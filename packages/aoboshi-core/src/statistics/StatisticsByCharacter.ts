/**
 * Card review data grouped and cached by character.
 */
export type StatisticsByCharacter = {
  id: string;

  /** Character literal */
  literal: string;

  /**
   * ISO 8601 date string when the first card containing this character was
   * added to the deck.
   *
   * Null if the character is unseen, i.e. the deck does not contain this
   * character (numberOfCards = 0).
   */
  firstAdded: string | null;

  /**
   * ISO 8601 date string when a card containing this character was reviewed
   * the first time.
   *
   * Null if the character is new, i.e. the deck contains this character but it
   * has never been reviewed (numberOfReviews = 0).
   */
  firstReviewed: string | null;

  /**
   * ISO 8601 date string when a card containing this character was reviewed
   * the last time.
   *
   * Null if the character is new, i.e. the deck contains this character but it
   * has never been reviewed (numberOfReviews = 0).
   */
  lastReviewed: string | null;

  /**
   * Total number of reviews of cards containing this character.
   */
  numberOfReviews: number;

  /**
   * Total number of cards in the deck containing this character.
   */
  numberOfCards: number;
};
