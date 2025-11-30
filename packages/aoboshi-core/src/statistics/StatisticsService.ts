import { StatisticsIncrementRepository } from "./StatisticsIncrementRepository";
import { CardReview, NewCard, isReview } from "./CardReview";
import { StatisticsIncrement } from "./StatisticsIncrement";
import { Analyzer } from "./Analyzer";
import { AnalysisContext } from "./AnalysisContext";
import { isPreProcessingAnalyzer } from "./PreProcessingAnalyzer";
import { randomId } from "~";
import { SettingsService } from "~/settings";

/** Generates statistics from card reviews */
export class StatisticsService {
  constructor(
    private analyzers: Analyzer[],
    private statisticsIncrementRepository: StatisticsIncrementRepository,
    private settingsService: SettingsService,
  ) {}

  /**
   * Prepares {@link AnalysisContext} for {@link generateStatistics}.
   *
   * Creates the context and calls each {@link PreProcessingAnalyzer}'s prepare
   * method. This allows asynchronous data loading in the analyzers before
   * running the actual statistics generation, which is run synchronously within
   * a database transaction.
   *
   * @param reviews new reviews since the last generation and all cards that
   * currently do not have any reviews
   */
  async prepareStatistics(reviews: (CardReview | NewCard)[]) {
    let context: AnalysisContext = {
      reviews,
      statisticsByCharacters: [],
      latestReviewTime: undefined,
      reviewDays: [],
      timeZoneConfig: this.getTimeZoneConfig(),
    };

    for (const analyzer of this.analyzers) {
      if (!isPreProcessingAnalyzer(analyzer)) {
        continue;
      }

      const nextContext = await analyzer.prepare(context);

      if (nextContext) {
        context = nextContext;
      }
    }

    return context;
  }

  /**
   * Generates statistics using the configured analyzers.
   *
   * Optionally, a custom performance mark can be passed to mark the start of
   * the generation process. This allows more accurate measuring of duration,
   * taking into account any additional processing done before calling this
   * method.
   *
   * @param preparedContext a context value created by {@link prepareStatistics}
   * @param startMark a performance mark name where to measure process duration,
   * or if undefined, the duration is measured from the start of this method
   * call.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
   */
  generateStatistics(
    preparedContext: AnalysisContext,
    startMark?: string,
  ): StatisticsIncrement {
    const defaultStartMark = performance.mark("startGenerateStatistics").name;
    const latestIncrement = this.statisticsIncrementRepository.findLatest();

    let context: AnalysisContext = preparedContext;

    for (const analyzer of this.analyzers) {
      const nextContext = analyzer.run(context);

      if (nextContext) {
        context = nextContext;
      }
    }

    const numberOfReviews = context.reviews.filter(isReview).length;
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
      numberOfNewCards: context.reviews.length - numberOfReviews,
      duration: Math.round(measure.duration),
    };

    this.statisticsIncrementRepository.save(newIncrement);

    return newIncrement;
  }

  private getTimeZoneConfig() {
    return this.settingsService.getSettings().timeZoneConfig;
  }
}
