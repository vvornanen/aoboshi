import { randomId } from "../randomId";
import { StatisticsByDayRepository } from "./StatisticsByDayRepository";
import { StatisticsByDay } from "./StatisticsByDay";
import { isReview } from "./CardReview";
import {
  getCharactersFromExpression,
  mergeStatisticsByDay,
  timestampToDate,
} from "./statisticsUtils";
import { AnalysisContext, Analyzer } from "./Analyzer";

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
