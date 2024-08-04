import { StatisticsByDay, StatisticsByDayRepository } from "~/statistics/day";
import {
  isReview,
  getCharactersFromExpression,
  mergeStatisticsByDay,
  timestampToDate,
  AnalysisContext,
  Analyzer,
} from "~/statistics";
import { randomId } from "~";

/**
 * Generates daily card review statistics.
 *
 * Incrementally merges the generated statistics with existing data.
 */
export class DayAnalyzer implements Analyzer {
  constructor(private statisticsByDayRepository: StatisticsByDayRepository) {}

  run(context: AnalysisContext) {
    const statisticsByDays = this.getStatisticsByDays(context);
    this.mergeAndSaveStatisticsByDays(statisticsByDays);
  }

  getStatisticsByDays(context: AnalysisContext): StatisticsByDay[] {
    return context.reviewDays.map((date) =>
      this.getStatisticsByDay(date, context),
    );
  }

  private getStatisticsByDay(
    date: string,
    context: AnalysisContext,
  ): StatisticsByDay {
    const addedCharacters = new Set<string>();
    const firstSeenCharacters = new Set<string>();
    const reviewedCharacters = new Set<string>();
    let numberOfReviews = 0;

    for (const stats of context.statisticsByCharacters) {
      if (stats.firstAdded === date) {
        addedCharacters.add(stats.literal);
      }

      if (stats.firstReviewed === date) {
        firstSeenCharacters.add(stats.literal);
      }
    }

    for (const review of context.reviews) {
      const reviewDate = isReview(review)
        ? timestampToDate(review.reviewTime, context.timeZoneConfig)
        : undefined;
      const characters: string[] = getCharactersFromExpression(
        review.expression,
      );

      if (reviewDate?.toString() === date) {
        characters.forEach((literal) => reviewedCharacters.add(literal));
        numberOfReviews++;
      }
    }

    return {
      id: randomId(),
      date,
      addedCharacters: Array.from(addedCharacters).join(""),
      firstSeenCharacters: Array.from(firstSeenCharacters).join(""),
      reviewedCharacters: Array.from(reviewedCharacters).join(""),
      numberOfAddedCharacters: addedCharacters.size,
      numberOfFirstSeenCharacters: firstSeenCharacters.size,
      numberOfReviewedCharacters: reviewedCharacters.size,
      numberOfReviews,
    } satisfies StatisticsByDay;
  }

  private mergeAndSaveStatisticsByDays(statisticsByDays: StatisticsByDay[]) {
    const result: StatisticsByDay[] = [];

    for (const stats of statisticsByDays) {
      const merged = mergeStatisticsByDay(
        this.statisticsByDayRepository.findByDate(stats.date),
        stats,
      );
      result.push(merged);
    }

    this.statisticsByDayRepository.saveAll(result);

    return result;
  }
}
