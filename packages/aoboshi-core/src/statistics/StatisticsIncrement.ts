/** Represents a single run of statistics generation. */
export type StatisticsIncrement = {
  id: string;

  /**
   * ISO 8601 timestamp, start of the date range of collected data (exclusive).
   *
   * Start timestamp equals the end timestamp of the previous increment.
   * This increment contains reviews after the start timestamp.
   */
  start: string | null;

  /**
   * ISO 8601 timestamp of the latest review in this increment (inclusive).
   */
  end: string | null;

  /** Number of card reviews processed. */
  numberOfReviews: number;

  /**
   * Number of new cards processed.
   *
   * This it not an incremental value after the last run, but the total
   * number of new cards currently present.
   */
  numberOfNewCards: number;

  /** Time in milliseconds elapsed while generating this increment. */
  duration: number;
};
