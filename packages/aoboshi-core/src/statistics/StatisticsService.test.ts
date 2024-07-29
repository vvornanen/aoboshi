import { describe, expect, test, vi, afterEach } from "vitest";
import { mock } from "vitest-mock-extended";
import { randomId } from "../randomId";
import { BookRepository } from "../books/BookRepository";
import { Chapter } from "../books/Book";
import { StatisticsService } from "./StatisticsService";
import { StatisticsByChapterRepository } from "./StatisticsByChapterRepository";
import { StatisticsByCharacterRepository } from "./StatisticsByCharacterRepository";
import { StatisticsByDayRepository } from "./StatisticsByDayRepository";
import { StatisticsIncrementRepository } from "./StatisticsIncrementRepository";
import { CardReview } from "./CardReview";
import * as fixtures from "./statisticsFixtures";
import { StatisticsByDay } from "./StatisticsByDay";
import { StatisticsByCharacter } from "./StatisticsByCharacter";
import { StatisticsByChapter } from "./StatisticsByChapter";

vi.mock("../randomId", () => {
  return {
    randomId: vi.fn(),
  };
});

const mockRandomIdOnce = (value: string) => {
  if (vi.isMockFunction(randomId)) {
    randomId.mockReturnValueOnce(value);
  }
};

const bookRepository = mock<BookRepository>();
const statisticsByChapterRepository = mock<StatisticsByChapterRepository>();
const statisticsByCharacterRepository = mock<StatisticsByCharacterRepository>();
const statisticsByDayRepository = mock<StatisticsByDayRepository>();
const statisticsIncrementRepository = mock<StatisticsIncrementRepository>();
const getCardStatisticsByCharacter = vi.fn();

const statisticsService = new StatisticsService(
  bookRepository,
  statisticsByChapterRepository,
  statisticsByCharacterRepository,
  statisticsByDayRepository,
  statisticsIncrementRepository,
  getCardStatisticsByCharacter,
);

afterEach(() => {
  vi.resetAllMocks();
});

describe("getStatisticsByCharacters", () => {
  test("no reviews", async () => {
    const reviews: CardReview[] = [];

    const actual = await statisticsService.getStatisticsByCharacters(reviews);

    expect(actual.statisticsByCharacters).toHaveLength(0);
    expect(actual.reviewDays).toHaveLength(0);
    expect(actual.latestReviewTime).toBeUndefined();
  });

  test("one card, one review", async () => {
    const testCase = fixtures.oneCardOneReview;

    mockRandomIdOnce("1");

    getCardStatisticsByCharacter.mockImplementation(
      testCase.getCardStatisticsByCharacter,
    );

    const actual = await statisticsService.getStatisticsByCharacters(
      testCase.reviews,
    );

    expect(actual.statisticsByCharacters).toEqual(
      testCase.statisticsByCharacters,
    );
    expect(actual.reviewDays).toEqual(testCase.reviewDays);
    expect(actual.latestReviewTime?.toString()).toEqual(
      testCase.latestReviewTime,
    );
  });

  test("multiple reviews", async () => {
    const testCase = fixtures.multipleReviews;

    mockRandomIdOnce("1");
    mockRandomIdOnce("2");
    mockRandomIdOnce("3");

    getCardStatisticsByCharacter.mockImplementation(
      testCase.getCardStatisticsByCharacter,
    );

    const actual = await statisticsService.getStatisticsByCharacters(
      testCase.reviews,
    );

    expect(actual.statisticsByCharacters).toEqual(
      testCase.statisticsByCharacters,
    );
    expect(actual.reviewDays).toEqual(testCase.reviewDays);
    expect(actual.latestReviewTime?.toString()).toEqual(
      testCase.latestReviewTime,
    );
  });
});

describe("getStatisticsByDays", () => {
  test("no days", () => {
    const testCase = fixtures.multipleReviews;

    const actual = statisticsService.getStatisticsByDays(
      [],
      testCase.reviews,
      testCase.statisticsByCharacters,
    );

    expect(actual).toHaveLength(0);
  });

  test("no reviews", () => {
    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByDays(
      ["2024-01-01"],
      [],
      [],
    );

    const expected: StatisticsByDay[] = [
      {
        id: "1",
        date: "2024-01-01",
        addedCharacters: "",
        firstSeenCharacters: "",
        reviewedCharacters: "",
        numberOfAddedCharacters: 0,
        numberOfFirstSeenCharacters: 0,
        numberOfReviewedCharacters: 0,
        numberOfReviews: 0,
      },
    ];

    expect(actual).toEqual(expected);
  });

  test("day has no reviews", () => {
    const testCase = fixtures.multipleReviews;

    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByDays(
      ["2024-01-01"],
      testCase.reviews,
      testCase.statisticsByCharacters,
    );

    const expected: StatisticsByDay[] = [
      {
        id: "1",
        date: "2024-01-01",
        addedCharacters: "",
        firstSeenCharacters: "",
        reviewedCharacters: "",
        numberOfAddedCharacters: 0,
        numberOfFirstSeenCharacters: 0,
        numberOfReviewedCharacters: 0,
        numberOfReviews: 0,
      },
    ];

    expect(actual).toEqual(expected);
  });

  test("one card, one review", () => {
    const testCase = fixtures.oneCardOneReview;

    mockRandomIdOnce("1");
    mockRandomIdOnce("2");

    const actual = statisticsService.getStatisticsByDays(
      ["2016-01-12", "2016-01-13"],
      testCase.reviews,
      testCase.statisticsByCharacters,
    );

    const expected: StatisticsByDay[] = [
      {
        id: "1",
        date: "2016-01-12",
        addedCharacters: "学",
        firstSeenCharacters: "",
        reviewedCharacters: "",
        numberOfAddedCharacters: 1,
        numberOfFirstSeenCharacters: 0,
        numberOfReviewedCharacters: 0,
        numberOfReviews: 0,
      },
      {
        id: "2",
        date: "2016-01-13",
        addedCharacters: "",
        firstSeenCharacters: "学",
        reviewedCharacters: "学",
        numberOfAddedCharacters: 0,
        numberOfFirstSeenCharacters: 1,
        numberOfReviewedCharacters: 1,
        numberOfReviews: 1,
      },
    ];

    expect(actual).toEqual(expected);
  });

  test("multiple reviews", () => {
    const testCase = fixtures.multipleReviews;

    mockRandomIdOnce("1");
    mockRandomIdOnce("2");
    mockRandomIdOnce("3");
    mockRandomIdOnce("4");

    const actual = statisticsService.getStatisticsByDays(
      ["2015-12-01", "2016-01-12", "2016-01-13", "2016-01-14"],
      testCase.reviews,
      testCase.statisticsByCharacters,
    );

    const expected: StatisticsByDay[] = [
      {
        id: "1",
        date: "2015-12-01",
        addedCharacters: "日",
        firstSeenCharacters: "",
        reviewedCharacters: "",
        numberOfAddedCharacters: 1,
        numberOfFirstSeenCharacters: 0,
        numberOfReviewedCharacters: 0,
        numberOfReviews: 0,
      },
      {
        id: "2",
        date: "2016-01-12",
        addedCharacters: "学大",
        firstSeenCharacters: "",
        reviewedCharacters: "",
        numberOfAddedCharacters: 2,
        numberOfFirstSeenCharacters: 0,
        numberOfReviewedCharacters: 0,
        numberOfReviews: 0,
      },
      {
        id: "3",
        date: "2016-01-13",
        addedCharacters: "",
        firstSeenCharacters: "学大日",
        reviewedCharacters: "学大日",
        numberOfAddedCharacters: 0,
        numberOfFirstSeenCharacters: 3,
        numberOfReviewedCharacters: 3,
        numberOfReviews: 3,
      },
      {
        id: "4",
        date: "2016-01-14",
        addedCharacters: "",
        firstSeenCharacters: "",
        reviewedCharacters: "学",
        numberOfAddedCharacters: 0,
        numberOfFirstSeenCharacters: 0,
        numberOfReviewedCharacters: 1,
        numberOfReviews: 1,
      },
    ];

    expect(actual).toEqual(expected);
  });
});

describe("getStatisticsByChapter", () => {
  test("empty chapter", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "",
    };

    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByChapter(
      "book1",
      chapter,
      toMap(fixtures.multipleReviews.statisticsByCharacters),
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 0,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 0,
    };

    expect(actual).toEqual(expected);
  });

  test("no character statistics", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学",
    };

    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByChapter(
      "book1",
      chapter,
      new Map(),
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "",
      newCharacters: "",
      unseenCharacters: "学",
      numberOfSeenCharacters: 0,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 1,
      totalNumberOfCharacters: 1,
    };

    expect(actual).toEqual(expected);
  });

  test("one character in string", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学",
    };

    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByChapter(
      "book1",
      chapter,
      toMap(fixtures.oneCardOneReview.statisticsByCharacters),
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 1,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 1,
    };

    expect(actual).toEqual(expected);
  });

  test("one character in array", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: [{ literal: "学", n: 1 }],
    };

    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByChapter(
      "book1",
      chapter,
      toMap(fixtures.oneCardOneReview.statisticsByCharacters),
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 1,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 1,
    };

    expect(actual).toEqual(expected);
  });

  test("all unseen", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学大日",
    };

    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByChapter(
      "book1",
      chapter,
      new Map(),
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "",
      newCharacters: "",
      unseenCharacters: "学大日",
      numberOfSeenCharacters: 0,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 3,
      totalNumberOfCharacters: 3,
    };

    expect(actual).toEqual(expected);
  });

  test("some seen, no new", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学大日",
    };

    mockRandomIdOnce("1");

    const seen = "学大";

    const actual = statisticsService.getStatisticsByChapter(
      "book1",
      chapter,
      toMap(
        fixtures.multipleReviews.statisticsByCharacters.filter(({ literal }) =>
          seen.includes(literal),
        ),
      ),
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学大",
      newCharacters: "",
      unseenCharacters: "日",
      numberOfSeenCharacters: 2,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 1,
      totalNumberOfCharacters: 3,
    };

    expect(actual).toEqual(expected);
  });

  // TODO: Needs statistics with number of cards but without reviews
  test.todo("some seen, some new");

  test("all seen", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学大日",
    };

    mockRandomIdOnce("1");

    const actual = statisticsService.getStatisticsByChapter(
      "book1",
      chapter,
      toMap(fixtures.multipleReviews.statisticsByCharacters),
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学大日",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 3,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 3,
    };

    expect(actual).toEqual(expected);
  });
});

const toMap = (stats: StatisticsByCharacter[]) => {
  const statisticsByCharacters = new Map<string, StatisticsByCharacter>();
  stats.forEach((stats) => statisticsByCharacters.set(stats.literal, stats));
  return statisticsByCharacters;
};
