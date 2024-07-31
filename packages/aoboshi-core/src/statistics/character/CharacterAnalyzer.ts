import { Temporal } from "@js-temporal/polyfill";
import { isReview } from "../CardReview";
import {
  getCharactersFromExpression,
  mergeStatisticsByCharacter,
  timestampToDate,
} from "../statisticsUtils";
import { Analyzer } from "../Analyzer";
import { AnalysisContext } from "../AnalysisContext";
import { CardStatisticsByCharacter } from "./CardStatisticsByCharacter";
import { StatisticsByCharacter } from "./StatisticsByCharacter";
import { StatisticsByCharacterRepository } from "./StatisticsByCharacterRepository";

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
    let latestReviewTime: Temporal.Instant | undefined;
    const reviewDays = new Set<string>();
    const statisticsByCharacters = new Map<string, StatisticsByCharacter>();

    for (const review of context.reviews) {
      const reviewTimestamp = isReview(review)
        ? Temporal.Instant.from(review.reviewTime)
        : undefined;
      const reviewDate =
        reviewTimestamp &&
        timestampToDate(reviewTimestamp, context.timeZoneConfig);
      reviewDate && reviewDays.add(reviewDate.toString());

      if (
        !latestReviewTime ||
        !reviewTimestamp ||
        Temporal.Instant.compare(latestReviewTime, reviewTimestamp) < 0
      ) {
        latestReviewTime = reviewTimestamp;
      }

      const characters: string[] = getCharactersFromExpression(
        review.expression,
      );

      for (const literal of characters) {
        const cardStatistics = await this.getCardStatisticsByCharacter(literal);

        if (!cardStatistics) {
          throw new Error(`Card statistics not found for character ${literal}`);
        }

        const merged = mergeStatisticsByCharacter(
          statisticsByCharacters.get(literal),
          {
            literal,
            firstAdded: cardStatistics.firstAdded,
            firstReviewed: reviewDate?.toString() || null,
            lastReviewed: reviewDate?.toString() || null,
            numberOfReviews: reviewDate ? 1 : 0,
            numberOfCards: cardStatistics.numberOfCards,
          },
        );
        statisticsByCharacters.set(literal, merged);
      }
    }

    return {
      statisticsByCharacters: Array.from(statisticsByCharacters.values()),
      latestReviewTime: latestReviewTime?.toString({
        smallestUnit: "millisecond",
      }),
      reviewDays: Array.from(reviewDays),
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
