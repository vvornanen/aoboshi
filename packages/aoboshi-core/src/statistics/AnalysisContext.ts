import { CardReview, NewCard } from "./CardReview";
import { TimeZoneConfig } from "./statisticsUtils";
import { StatisticsByCharacter } from "~/statistics/character";

/**
 * Contains data available to all {@link Analyzer} instances during statistics
 * generation.
 *
 * @see StatisticsService
 */
export type AnalysisContext = {
  /**
   * New reviews since the last statistics generation and all cards that
   * currently do not have any reviews.
   *
   * Reviews must be provided to {@link StatisticsService} when the context
   * is prepared.
   */
  reviews: (CardReview | NewCard)[];

  /**
   * Card review data aggregated by characters.
   *
   * Produced by {@link CharacterAnalyzer} and may be consumed by other
   * analyzers.
   */
  statisticsByCharacters: StatisticsByCharacter[];

  /**
   * ISO 8601 timestamp of the latest card review in `reviews`.
   *
   * Produced by {@link CharacterAnalyzer} and may be consumed by other
   * analyzers.
   */
  latestReviewTime: string | undefined;

  /**
   * A set of dates resolved from all review timestamps in `reviews`.
   *
   * Values are unique ISO 8601 dates without time in ascending order.
   * Dates are resolved from timestamps using the context's time zone
   * configuration.
   *
   * Produced by {@link CharacterAnalyzer} and may be consumed by other
   * analyzers.
   */
  reviewDays: string[];

  /**
   * Specifies how timestamps should be converted to local dates.
   *
   * Timestamps are recorded in UTC, but in the statistics should use precise
   * local dates based on the time zone where the timestamp was recorded.
   *
   * Provided by {@link StatisticsService} when the context is created.
   */
  timeZoneConfig: TimeZoneConfig[];
};
