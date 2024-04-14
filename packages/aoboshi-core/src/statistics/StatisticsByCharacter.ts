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
   */
  firstAdded: string;

  /**
   * ISO 8601 date string when a card containing this character was reviewed
   * the first time.
   */
  firstReviewed: string;

  /**
   * ISO 8601 date string when a card containing this character was reviewed
   * the last time.
   */
  lastReviewed: string;

  /**
   * Total number of reviews of cards containing this character.
   */
  numberOfReviews: number;

  /**
   * Total number of cards in the deck containing this character.
   */
  numberOfCards: number;
};
