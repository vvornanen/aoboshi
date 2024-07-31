/** Represents one review of a card */
export type CardReview = {
  cardId: string | number;

  /** Card text content */
  expression: string;

  /** ISO 8601 datetime string */
  reviewTime: string;
};

/** Represents a new card without reviews */
export type NewCard = Omit<CardReview, "reviewTime">;

export const isReview = (value: CardReview | NewCard): value is CardReview =>
  "reviewTime" in value;
