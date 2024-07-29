/** Represents one review of a card */
export type CardReview = {
  cardId: string | number;

  /** Card text content */
  expression: string;

  /** ISO 8601 datetime string */
  reviewTime: string; // TODO: Allow null to represent a new card
};
