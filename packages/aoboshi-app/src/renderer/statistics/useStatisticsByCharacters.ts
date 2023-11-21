import { useMemo } from "react";

export type StatisticsByCharacter = {
  /** Character literal */
  literal: string;

  /**
   * ISO 8601 timestamp when the first card containing this character was added to the deck.
   *
   * Null if the deck does not contain this character.
   */
  added: string | null;

  /**
   * ISO 8601 timestamp of the first review of a card containing this character.
   *
   * Null if the character has not yet been reviewed.
   */
  firstReview: string | null;

  /**
   * ISO 8601 timestamp of the last review of a card containing this character.
   *
   * Null if the character has not yet been reviewed.
   */
  lastReview: string | null;

  /** Total number of reviews of cards containing this character */
  numberOfReviews: number;

  /** Total number of cards containing this character */
  numberOfCards: number;
};

/**
 * Returns cached statistics for the given characters.
 *
 * @param literals an array of character literals
 */
export const useStatisticsByCharacters = (
  literals: string[],
): StatisticsByCharacter[] => {
  return useMemo(
    () =>
      literals.map((literal) => ({
        literal,
        // TODO: Get cached data from store
        added: "2023-01-01T00:00:00Z",
        firstReview: "2023-01-01T00:00:00Z",
        lastReview: "2023-01-01T00:00:00Z",
        numberOfReviews: 1,
        numberOfCards: 1,
      })),
    [literals],
  );
};
