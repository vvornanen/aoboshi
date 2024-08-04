import { Temporal } from "@js-temporal/polyfill";
import { intervalToDuration } from "~/AnkiCardReview";

export type AnkiCardField = {
  value: string;
  order: number;
};

/** Raw data returned by AnkiConnect */
export type AnkiInternalCard = {
  /** Timestamp when the card was created in Epoch milliseconds. */
  cardId: number;

  fields: Record<string, AnkiCardField>;
  fieldOrder: number;
  question: string;
  answer: string;
  modelName: string;
  ord: number;
  deckName: string;
  css: string;

  /**
   * Ease factor of the card in fractions of 1000.
   *
   * For example, ease factor 2500 means that card’s interval will be multiplied
   * by 2.5 the next time you press "Good".
   */
  factor: number;

  /**
   * Card interval.
   *
   * Negative value is seconds, positive value is days.
   */
  interval: number;

  note: number;

  /**
   * Card type.
   *
   * - 0: new
   * - 1: learning
   * - 2: review
   * - 3: relearning
   */
  type: number;

  queue: number;

  /**
   * Value depends on card type.
   *
   * - New: 1-indexed card study order
   * - Learning and relearning: due date in Epoch seconds
   * - Review: days since the collection was created
   */
  due: number;

  /** Number of reviews. */
  reps: number;

  /** Number of fails while the card was in review.  */
  lapses: number;

  /**
   * A combined number of remaining reviews.
   *
   * A sum `a * 1000 + b` where
   * - `a` is number of reviews remaining today
   * - `b` is number of reviews remaining until card's graduation
   *
   * Example: `3005` means 3 reviews remaining today and 5 reviews until
   * graduation.
   */
  left: number;

  /** Timestamp when the card was last modified in Epoch seconds. */
  mod: number;
};

/** Anki card data converted into a more readable format.
 *
 * Some unused properties present in {@link AnkiInternalCard} were dropped from
 * this simplified type. Add missing properties when needed.
 */
export type AnkiCard = {
  id: number;

  /** ISO 8601 datetime string when the card was created. */
  created: string;

  /** ISO 8601 datetime string when the card was las modified. */
  modified: string;

  fields: Record<string, AnkiCardField>;
  modelName: string;
  deckName: string;

  /**
   * Ease factor of the card in fractions of 1000.
   *
   * For example, ease factor 2500 means that card’s interval will be multiplied
   * by 2.5 the next time you press "Good".
   */
  easeFactor: number;

  /** Review interval as ISO 8601 duration string. */
  interval: string;

  noteId: number;

  status: "new" | "learning" | "review" | "relearning";

  numberOfReviews: number;

  /** Number of fails while the card was in review.  */
  numberOfLapses: number;

  numberOfRemainingReviews: {
    today: number;
    untilGraduation: number;
  };
};

export const fromInternalCard = (card: AnkiInternalCard): AnkiCard => ({
  id: card.cardId,
  created: Temporal.Instant.fromEpochMilliseconds(card.cardId).toString(),
  modified: Temporal.Instant.fromEpochSeconds(card.mod).toString(),
  fields: card.fields,
  modelName: card.modelName,
  deckName: card.deckName,
  easeFactor: card.factor,
  interval: intervalToDuration(card.interval).toString(),
  noteId: card.note,
  status: getCardStatus(card.type),
  numberOfReviews: card.reps,
  numberOfLapses: card.lapses,
  numberOfRemainingReviews: {
    today: Math.floor(card.left / 1000),
    untilGraduation: card.left % 1000,
  },
});

export const getCardStatus = (value: number) => {
  switch (value) {
    case 0:
      return "new";
    case 1:
      return "learning";
    case 2:
      return "review";
    case 3:
      return "relearning";
    default:
      throw new Error(`Unknown card status ${value}`);
  }
};
