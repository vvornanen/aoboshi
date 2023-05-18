import { Temporal } from "@js-temporal/polyfill";

export enum ReviewType {
  Learn = "LEARN",
  Review = "REVIEW",
  Relearn = "RELEARN",
  Cram = "CRAM",
}

/** ISO 8601 duration string */
type Duration = string;

/** ISO 8601 datetime string */
type Instant = string;

/** Represents a row in Anki database `revlog` table */
export type AnkiCardReviewTuple = [
  number, // reviewTime
  number, // cardID
  number, // usn
  number, // buttonPressed
  number, // newInterval
  number, // previousInterval
  number, // newFactor
  number, // reviewDuration
  number // reviewType
];

/**
 * Anki cards review data in a more readable format.
 */
export type AnkiCardReview = {
  /** Timestamp of when you did the review */
  reviewTime: Instant;

  /** Refers to `cards.id` */
  cardId: number;

  /**
   * Update sequence number: for finding diffs when syncing.
   *
   * See the description in the cards table for more info.
   */
  usn: number;

  /**
   * Which button you pushed to score your recall.
   *
   * review: 1(wrong), 2(hard), 3(ok), 4(easy)
   * learn/relearn: 1(wrong), 2(ok), 3(easy)
   */
  ease: number;

  /** Duration of interval (used in SRS algorithm). */
  newInterval: Duration;

  /**
   * Duration of last interval (i.e. the last value of ivl. Note that this
   * value is not necessarily equal to the actual interval between this review
   * and the preceding review)
   */
  previousInterval: Duration;

  /**
   * The ease factor of the card in permille (parts per thousand). If the ease
   * factor is 2500, the card’s interval will be multiplied by 2.5 the next time
   * you press Good.
   */
  newFactor: number;

  /**
   * Duration of how long your review took, up to 60000 (60s).
   */
  reviewDuration: Duration;

  reviewType: ReviewType;
};

/**
 * Converts Anki interval value to Duration.
 *
 * @param value negative = seconds, positive = days
 */
export const intervalToDuration = (value: number): Temporal.Duration => {
  return value < 0
    ? Temporal.Duration.from({ seconds: -value })
    : Temporal.Duration.from({ days: value });
};

export const getReviewType = (value: number): ReviewType => {
  switch (value) {
    case 0:
      return ReviewType.Learn;
    case 1:
      return ReviewType.Review;
    case 2:
      return ReviewType.Relearn;
    case 3:
      return ReviewType.Cram;
    default:
      throw new Error(`Unknown review type ${value}`);
  }
};

/**
 * Converts the Anki response to more readable format.
 *
 * @param tuple a row in Anki database `revlog` table
 */
export const fromTuple = (tuple: AnkiCardReviewTuple): AnkiCardReview => {
  return {
    reviewTime: Temporal.Instant.fromEpochMilliseconds(tuple[0]).toString(),
    cardId: tuple[1],
    usn: tuple[2],
    ease: tuple[3],
    newInterval: intervalToDuration(tuple[4]).toString(),
    previousInterval: intervalToDuration(tuple[5]).toString(),
    newFactor: tuple[6],
    reviewDuration: Temporal.Duration.from({
      milliseconds: tuple[7],
    }).toString(),
    reviewType: getReviewType(tuple[8]),
  };
};
