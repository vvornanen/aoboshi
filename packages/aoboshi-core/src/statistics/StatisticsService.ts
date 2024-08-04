import { Temporal } from "@js-temporal/polyfill";
import { StatisticsIncrementRepository } from "./StatisticsIncrementRepository";
import { CardReview, NewCard } from "./CardReview";
import { StatisticsIncrement } from "./StatisticsIncrement";
import { TimeZoneConfig } from "./statisticsUtils";
import { Analyzer } from "./Analyzer";
import { AnalysisContext } from "./AnalysisContext";
import { randomId } from "~";

/** Generates statistics from card reviews */
export class StatisticsService {
  constructor(
    private analyzers: Analyzer[],
    private statisticsIncrementRepository: StatisticsIncrementRepository,
  ) {}

  /**
   * Generates statistics using the configured analyzers.
   *
   * @param reviews new reviews since the last generation and all cards that
   * currently do not have any reviews
   */
  async generateStatistics(
    reviews: (CardReview | NewCard)[],
  ): Promise<StatisticsIncrement> {
    const started = Temporal.Now.instant();
    const latestIncrement = this.statisticsIncrementRepository.findLatest();

    let context: AnalysisContext = {
      reviews,
      statisticsByCharacters: [],
      latestReviewTime: undefined,
      reviewDays: [],
      timeZoneConfig: this.getTimeZoneConfig(),
    };

    for (const analyzer of this.analyzers) {
      const nextContext = await analyzer.run(context);
      if (nextContext) {
        context = nextContext;
      }
    }

    const completed = Temporal.Now.instant();

    // Create new increment
    const newIncrement: StatisticsIncrement = {
      id: randomId(),
      start: latestIncrement?.end || null,
      end: context.latestReviewTime || latestIncrement?.end || null,
      numberOfReviews: reviews.length,
      duration: Math.round(started.until(completed).total("millisecond")),
    };

    this.statisticsIncrementRepository.save(newIncrement);

    return newIncrement;
  }

  private getTimeZoneConfig() {
    // TODO: Get time zones from settings service
    return [{ timeZone: "UTC" }] satisfies TimeZoneConfig[];
  }
}
