import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { StatisticsByDay } from "./StatisticsByDay";
import { StatisticsByDayRepository } from "./StatisticsByDayRepository";
import { DayAnalyzer } from "~/statistics/day";
import * as fixtures from "~/statistics/statisticsFixtures";
import { randomId } from "~/randomId";

vi.mock("~/randomId", () => {
  return {
    randomId: vi.fn(),
  };
});

const mockRandomId = (value?: string) => {
  let autoIncrement = 1;

  if (vi.isMockFunction(randomId)) {
    randomId.mockImplementation(() => value || String(autoIncrement++));
  }
};

const statisticsByDayRepository = mock<StatisticsByDayRepository>();

const analyzer = new DayAnalyzer(statisticsByDayRepository);

beforeEach(() => {
  mockRandomId();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("getStatisticsByDays", () => {
  test("no days", () => {
    const actual = analyzer.getStatisticsByDays({
      ...fixtures.multipleReviews,
      reviewDays: [],
    });

    expect(actual).toHaveLength(0);
  });

  test("no reviews", () => {
    const actual = analyzer.getStatisticsByDays({
      ...fixtures.noReviews,
      reviewDays: ["2024-01-01"],
    });

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
    const actual = analyzer.getStatisticsByDays({
      ...fixtures.multipleReviews,
      reviewDays: ["2024-01-01"],
    });

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
    const actual = analyzer.getStatisticsByDays({
      ...fixtures.oneCardOneReview,
      reviewDays: ["2016-01-12", "2016-01-13"],
    });

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
    const actual = analyzer.getStatisticsByDays({
      ...fixtures.multipleReviews,
      reviewDays: ["2015-12-01", "2016-01-12", "2016-01-13", "2016-01-14"],
    });

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

describe("run", () => {
  beforeEach(() => {
    mockRandomId("random id");
  });

  test("merges and saves statistics by day", () => {
    analyzer.run({
      ...fixtures.oneCardOneReview,
      reviews: [
        { cardId: "1", expression: "学", reviewTime: "2016-01-15T18:45:21Z" },
      ],
      reviewDays: ["2016-01-15"],
      latestReviewTime: "2016-01-15T18:45:21Z",
    });

    const expected: StatisticsByDay[] = [
      {
        id: "random id",
        date: "2016-01-15",
        addedCharacters: "",
        firstSeenCharacters: "",
        reviewedCharacters: "学",
        numberOfAddedCharacters: 0,
        numberOfFirstSeenCharacters: 0,
        numberOfReviewedCharacters: 1,
        numberOfReviews: 1,
      },
    ];

    expect(statisticsByDayRepository.saveAll).toHaveBeenCalledWith(expected);
  });
});
