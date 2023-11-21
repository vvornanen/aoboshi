export type StatisticsByChapter = {
  /** Chapter id */
  chapterId: string;

  /** Number of characters contained in the deck (unreviewed + reviewed) */
  numberOfAddedCharacters: number;

  /** Number of characters contained in the deck but with no reviews */
  numberOfUnreviewedCharacters: number;

  /** Number of characters with at least one review */
  numberOfReviewedCharacters: number;

  /** Total number of characters in this chapter, including those that are not contained in the deck */
  totalNumberOfCharacters: number;

  /** Number of reviewed characters divided by total number of characters */
  reviewedRatio: number;

  // TODO: Number of characters grouped by number of cards (new, learning, reviewing)
};

/**
 * Returns cached statistics for the given chapter.
 *
 * @param chapterId
 */
export const useStatisticsByChapter = (
  chapterId: string,
): StatisticsByChapter => {
  return {
    chapterId,
    numberOfAddedCharacters: 0,
    numberOfUnreviewedCharacters: 0,
    numberOfReviewedCharacters: 0,
    totalNumberOfCharacters: 0,
    reviewedRatio: 0,
  };
};
