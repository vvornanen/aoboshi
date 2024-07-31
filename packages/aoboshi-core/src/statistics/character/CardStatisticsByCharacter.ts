/** Card statistics aggregated by character */
export type CardStatisticsByCharacter = {
  /** Character literal */
  literal: string;

  /**
   * ISO 8601 date string when the first card containing the character was
   * added to the deck.
   */
  firstAdded: string;

  /**
   * Total number of cards in the deck containing this character.
   */
  numberOfCards: number;
};
