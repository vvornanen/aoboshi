import { StatisticsIncrementRepository } from "./StatisticsIncrementRepository";
import { CardReview, NewCard, isReview } from "./CardReview";
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

  markStartGenerateStatistics() {
    performance.mark("startGenerateStatistics");
  }

  /**
   * Generates statistics using the configured analyzers.
   *
   * Optionally, a custom performance mark can be passed to mark the start of
   * the generation process. This allows more accurate measuring of duration,
   * taking into account any additional processing done before calling this
   * method.
   *
   * @param reviews new reviews since the last generation and all cards that
   * currently do not have any reviews
   * @param startMark a performance mark name where to measure process duration,
   * or if undefined, the duration is measured from the start of this method
   * call.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
   */
  async generateStatistics(
    reviews: (CardReview | NewCard)[],
    startMark?: string,
  ): Promise<StatisticsIncrement> {
    const defaultStartMark = performance.mark("startGenerateStatistics").name;
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

    const numberOfReviews = reviews.filter(isReview).length;
    const endMark = performance.mark("endGenerateStatistics").name;
    const measure = performance.measure(
      "generateStatistics",
      startMark ?? defaultStartMark,
      endMark,
    );

    // Create new increment
    const newIncrement: StatisticsIncrement = {
      id: randomId(),
      start: latestIncrement?.end || null,
      end: context.latestReviewTime || latestIncrement?.end || null,
      numberOfReviews,
      numberOfNewCards: reviews.length - numberOfReviews,
      duration: Math.round(measure.duration),
    };

    this.statisticsIncrementRepository.save(newIncrement);

    return newIncrement;
  }

  private getTimeZoneConfig() {
    // TODO: Get time zones from settings service
    return [{ timeZone: "UTC" }] satisfies TimeZoneConfig[];
  }
}
