import { Temporal } from "@js-temporal/polyfill";
import {
  CardStatisticsByCharacter,
  StatisticsByCharacter,
  StatisticsByCharacterRepository,
} from "~/statistics/character";
import {
  AnalysisContext,
  Analyzer,
  getCharactersFromExpression,
  isReview,
  mergeStatisticsByCharacter,
  timestampToDate,
} from "~/statistics";
import { nullableMaxInstant } from "~";

/**
 * Adapter for fetching card statistics from an external source such as Anki
 */
export type GetCardStatisticsByCharacter = (
  literal: string,
) =>
  | CardStatisticsByCharacter
  | null
  | Promise<CardStatisticsByCharacter | null>;

/**
 * Generates card review statistics aggregated by character.
 *
 * Incrementally merges the generated statistics with existing data.
 */
export class CharacterAnalyzer implements Analyzer {
  constructor(
    private statisticsByCharacterRepository: StatisticsByCharacterRepository,
    private getCardStatisticsByCharacter: GetCardStatisticsByCharacter,
  ) {}

  async run(context: AnalysisContext) {
    const { statisticsByCharacters, latestReviewTime, reviewDays } =
      await this.getStatisticsByCharacters(context);
    const result = this.mergeAndSaveStatisticsByCharacters(
      statisticsByCharacters,
    );

    return {
      ...context,
      statisticsByCharacters: result,
      latestReviewTime,
      reviewDays,
    };
  }

  async getStatisticsByCharacters(context: AnalysisContext) {
    let latestReviewTime: Temporal.Instant | undefined = undefined;
    const reviewDays = new Set<string>();
    const statisticsByCharacters = new Map<string, StatisticsByCharacter>();

    for (const review of context.reviews) {
      const reviewTimestamp = isReview(review)
        ? Temporal.Instant.from(review.reviewTime)
        : undefined;
      const reviewDate =
        reviewTimestamp &&
        timestampToDate(reviewTimestamp, context.timeZoneConfig);

      if (reviewDate) {
        reviewDays.add(reviewDate.toString());
      }

      latestReviewTime = nullableMaxInstant(latestReviewTime, reviewTimestamp);

      const characters: string[] = getCharactersFromExpression(
        review.expression,
      );

      for (const literal of characters) {
        const merged = mergeStatisticsByCharacter(
          statisticsByCharacters.get(literal),
          {
            literal,
            firstAdded: null,
            firstReviewed: reviewDate?.toString() || null,
            lastReviewed: reviewDate?.toString() || null,
            numberOfReviews: reviewDate ? 1 : 0,
            numberOfCards: 0,
          },
        );
        statisticsByCharacters.set(literal, merged);
      }
    }

    for (const stats of statisticsByCharacters.values()) {
      const cardStatistics = await this.getCardStatisticsByCharacter(
        stats.literal,
      );

      if (!cardStatistics) {
        throw new Error(
          `Card statistics not found for character ${stats.literal}`,
        );
      }

      stats.firstAdded = timestampToDate(
        cardStatistics.firstAdded,
        context.timeZoneConfig,
      ).toString();
      stats.numberOfCards = cardStatistics.numberOfCards;
      reviewDays.add(stats.firstAdded);
    }

    return {
      statisticsByCharacters: Array.from(statisticsByCharacters.values()),
      latestReviewTime: latestReviewTime?.toString({
        smallestUnit: "millisecond",
      }),
      reviewDays: Array.from(reviewDays).sort(),
    };
  }

  private mergeAndSaveStatisticsByCharacters(
    statisticsByCharacters: StatisticsByCharacter[],
  ) {
    const result: StatisticsByCharacter[] = [];

    for (const stats of statisticsByCharacters) {
      const merged = mergeStatisticsByCharacter(
        this.statisticsByCharacterRepository.findByLiteral(stats.literal),
        stats,
      );
      result.push(merged);
    }

    this.statisticsByCharacterRepository.saveAll(result);

    return result;
  }
}
