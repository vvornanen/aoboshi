import { Temporal } from "@js-temporal/polyfill";
import { randomId } from "../randomId";
import { maxDate, minDate } from "../dateUtils";
import { StatisticsByChapterRepository } from "./StatisticsByChapterRepository";
import { StatisticsByCharacterRepository } from "./StatisticsByCharacterRepository";
import { StatisticsByDayRepository } from "./StatisticsByDayRepository";
import { StatisticsIncrementRepository } from "./StatisticsIncrementRepository";
import { CardReview } from "./CardReview";
import { StatisticsIncrement } from "./StatisticsIncrement";
import {
  getCharactersFromExpression,
  timestampToDate,
  TimeZoneConfig,
} from "./statisticsUtils";
import { CardStatisticsByCharacter } from "./CardStatisticsByCharacter";
import { StatisticsByCharacter } from "./StatisticsByCharacter";
import { StatisticsByDay } from "./StatisticsByDay";

/**
 * Adapter for fetching card statistics from an external source such as Anki
 */
export type GetCardStatisticsByCharacter = (
  literal: string,
) =>
  | CardStatisticsByCharacter
  | null
  | Promise<CardStatisticsByCharacter | null>;

/** Generates statistics from card reviews */
export class StatisticsService {
  constructor(
    private statisticsByChapterRepository: StatisticsByChapterRepository,
    private statisticsByCharacterRepository: StatisticsByCharacterRepository,
    private statisticsByDayRepository: StatisticsByDayRepository,
    private statisticsIncrementRepository: StatisticsIncrementRepository,
    private getCardStatisticsByCharacter: GetCardStatisticsByCharacter,
  ) {}

  async generateStatistics(
    reviews: CardReview[],
  ): Promise<StatisticsIncrement> {
    const started = Temporal.Now.instant();

    const latestIncrement = this.statisticsIncrementRepository.findLatest();

    const { statisticsByCharacters, latestReviewTime, reviewDays } =
      await this.getStatisticsByCharacters(reviews);

    // TODO: Update and save statistics by character

    // TODO: Remove eslint-disable-next-line
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const statisticsByDays = this.getStatisticsByDays(
      reviewDays,
      reviews,
      statisticsByCharacters,
    );

    // TODO: Get statistics by book chapter
    // TODO: Update and save statistics by book chapter

    const completed = Temporal.Now.instant();

    // Create new increment
    const newIncrement: StatisticsIncrement = {
      id: randomId(),
      start: latestIncrement?.end || null,
      end: latestReviewTime?.toString() || latestIncrement?.end || null,
      numberOfReviews: reviews.length,
      duration: started.until(completed).total("millisecond"),
    };

    this.statisticsIncrementRepository.save(newIncrement);

    return newIncrement;
  }

  async getStatisticsByCharacters(reviews: CardReview[]) {
    const timeZoneConfig = this.getTimeZoneConfig();

    let latestReviewTime: Temporal.Instant | undefined;
    const reviewDays = new Set<string>();
    const statisticsByCharacters = new Map<string, StatisticsByCharacter>();

    for (const review of reviews) {
      const reviewTimestamp = Temporal.Instant.from(review.reviewTime);
      const reviewDate = timestampToDate(reviewTimestamp, timeZoneConfig);
      reviewDays.add(reviewDate.toString());

      if (
        !latestReviewTime ||
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

        let statisticsByCharacter = statisticsByCharacters.get(literal);

        if (!statisticsByCharacter) {
          statisticsByCharacter = {
            id: randomId(),
            literal,
            firstAdded: cardStatistics.firstAdded,
            firstReviewed: reviewDate.toString(),
            lastReviewed: reviewDate.toString(),
            numberOfReviews: 1,
            numberOfCards: cardStatistics.numberOfCards,
          };
          statisticsByCharacters.set(literal, statisticsByCharacter);
        } else {
          statisticsByCharacter.firstReviewed = minDate(
            statisticsByCharacter.firstReviewed,
            reviewDate,
          ).toString();
          statisticsByCharacter.lastReviewed = maxDate(
            statisticsByCharacter.lastReviewed,
            reviewDate,
          ).toString();
          statisticsByCharacter.numberOfReviews++;
        }
      }
    }

    return {
      statisticsByCharacters: Array.from(statisticsByCharacters.values()),
      latestReviewTime,
      reviewDays: Array.from(reviewDays),
    };
  }

  private getTimeZoneConfig() {
    // TODO: Get time zones from settings service
    return [{ timeZone: "UTC" }] satisfies TimeZoneConfig[];
  }

  getStatisticsByDays(
    reviewDays: string[],
    reviews: CardReview[],
    statisticsByCharacters: Iterable<StatisticsByCharacter>,
  ): StatisticsByDay[] {
    return reviewDays.map((date) =>
      this.getStatisticsByDay(date, reviews, statisticsByCharacters),
    );
  }

  private getStatisticsByDay(
    date: string,
    reviews: CardReview[],
    statisticsByCharacters: Iterable<StatisticsByCharacter>,
  ): StatisticsByDay {
    const timeZoneConfig = this.getTimeZoneConfig();
    const addedCharacters = new Set<string>();
    const firstSeenCharacters = new Set<string>();
    const reviewedCharacters = new Set<string>();
    let numberOfReviews = 0;

    for (const stats of statisticsByCharacters) {
      if (stats.firstAdded === date) {
        addedCharacters.add(stats.literal);
      }

      if (stats.firstReviewed === date) {
        firstSeenCharacters.add(stats.literal);
      }
    }

    for (const review of reviews) {
      const reviewDate = timestampToDate(review.reviewTime, timeZoneConfig);
      const characters: string[] = getCharactersFromExpression(
        review.expression,
      );

      if (reviewDate.toString() === date) {
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
}
