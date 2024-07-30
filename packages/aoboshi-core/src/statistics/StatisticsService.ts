import { Temporal } from "@js-temporal/polyfill";
import { randomId } from "../randomId";
import { BookRepository } from "../books/BookRepository";
import { Chapter } from "../books/Book";
import { StatisticsByChapterRepository } from "./StatisticsByChapterRepository";
import { StatisticsByCharacterRepository } from "./StatisticsByCharacterRepository";
import { StatisticsByDayRepository } from "./StatisticsByDayRepository";
import { StatisticsIncrementRepository } from "./StatisticsIncrementRepository";
import { CardReview, isReview, NewCard } from "./CardReview";
import { StatisticsIncrement } from "./StatisticsIncrement";
import {
  getCharactersFromExpression,
  mergeStatisticsByCharacter,
  timestampToDate,
  TimeZoneConfig,
} from "./statisticsUtils";
import { CardStatisticsByCharacter } from "./CardStatisticsByCharacter";
import { StatisticsByCharacter } from "./StatisticsByCharacter";
import { StatisticsByDay } from "./StatisticsByDay";
import { StatisticsByChapter } from "./StatisticsByChapter";

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
    private bookRepository: BookRepository,
    private statisticsByChapterRepository: StatisticsByChapterRepository,
    private statisticsByCharacterRepository: StatisticsByCharacterRepository,
    private statisticsByDayRepository: StatisticsByDayRepository,
    private statisticsIncrementRepository: StatisticsIncrementRepository,
    private getCardStatisticsByCharacter: GetCardStatisticsByCharacter,
  ) {}

  /**
   * Generates statistics by character, by day and by book chapter.
   *
   * Incrementally merges the generated statistics with existing data.
   *
   * @param reviews new reviews since the last generation and all cards that
   * currently do not have any reviews
   */
  async generateStatistics(
    reviews: (CardReview | NewCard)[],
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

    // TODO: Remove eslint-disable-next-line
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const statisticsByChapters = this.getStatisticsByChapters(
      statisticsByCharacters,
    );

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

  async getStatisticsByCharacters(reviews: (CardReview | NewCard)[]) {
    const timeZoneConfig = this.getTimeZoneConfig();

    let latestReviewTime: Temporal.Instant | undefined;
    const reviewDays = new Set<string>();
    const statisticsByCharacters = new Map<string, StatisticsByCharacter>();

    for (const review of reviews) {
      const reviewTimestamp = isReview(review)
        ? Temporal.Instant.from(review.reviewTime)
        : undefined;
      const reviewDate =
        reviewTimestamp && timestampToDate(reviewTimestamp, timeZoneConfig);
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
    reviews: (CardReview | NewCard)[],
    statisticsByCharacters: Iterable<StatisticsByCharacter>,
  ): StatisticsByDay[] {
    return reviewDays.map((date) =>
      this.getStatisticsByDay(date, reviews, statisticsByCharacters),
    );
  }

  private getStatisticsByDay(
    date: string,
    reviews: (CardReview | NewCard)[],
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
      const reviewDate = isReview(review)
        ? timestampToDate(review.reviewTime, timeZoneConfig)
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

  getStatisticsByChapters(statisticsByCharacters: StatisticsByCharacter[]) {
    const books = this.bookRepository.findAll();
    const statisticsByChapters: StatisticsByChapter[] = [];

    for (const book of books) {
      for (const volume of book.volumes) {
        for (const chapter of volume.chapters) {
          statisticsByChapters.push(
            this.getStatisticsByChapter(
              book.id,
              chapter,
              statisticsByCharacters,
            ),
          );
        }
      }
    }

    return statisticsByChapters;
  }

  getStatisticsByChapter(
    bookId: string,
    chapter: Chapter,
    statisticsByCharacters: StatisticsByCharacter[],
  ): StatisticsByChapter {
    const statisticsByCharactersMap = toMap(statisticsByCharacters);

    const seenCharacters = new Set<string>();
    const newCharacters = new Set<string>();
    const unseenCharacters = new Set<string>();

    for (const character of chapter.characters) {
      const literal =
        typeof character === "string" ? character : character.literal;
      const statisticsByCharacter = statisticsByCharactersMap.get(literal);

      if (!statisticsByCharacter) {
        unseenCharacters.add(literal);
        continue;
      }

      if (statisticsByCharacter.numberOfReviews > 0) {
        seenCharacters.add(literal);
      } else if (
        statisticsByCharacter.numberOfReviews === 0 &&
        statisticsByCharacter.numberOfCards > 0
      ) {
        newCharacters.add(literal);
      } else {
        unseenCharacters.add(literal);
      }
    }

    return {
      id: randomId(),
      bookId,
      chapterId: chapter.id,
      seenCharacters: Array.from(seenCharacters).join(""),
      newCharacters: Array.from(newCharacters).join(""),
      unseenCharacters: Array.from(unseenCharacters).join(""),
      numberOfSeenCharacters: seenCharacters.size,
      numberOfNewCharacters: newCharacters.size,
      numberOfUnseenCharacters: unseenCharacters.size,
      totalNumberOfCharacters: chapter.characters.length,
    };
  }
}

const toMap = (stats: StatisticsByCharacter[]) => {
  const statisticsByCharacters = new Map<string, StatisticsByCharacter>();
  stats.forEach((stats) => statisticsByCharacters.set(stats.literal, stats));
  return statisticsByCharacters;
};
