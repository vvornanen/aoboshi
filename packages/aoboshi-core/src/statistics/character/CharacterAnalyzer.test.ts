import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import {
  CharacterAnalyzer,
  StatisticsByCharacter,
  StatisticsByCharacterRepository,
} from "~/statistics/character";
import * as fixtures from "~/statistics/statisticsFixtures";
import { randomId } from "~";
import { AnalysisContext } from "~/statistics";

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

const statisticsByCharacterRepository = mock<StatisticsByCharacterRepository>();
const getCardStatisticsByCharacter = vi.fn();

const analyzer = new CharacterAnalyzer(
  statisticsByCharacterRepository,
  getCardStatisticsByCharacter,
);

beforeEach(() => {
  mockRandomId();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("getStatisticsByCharacters", () => {
  test("no reviews", () => {
    const actual = analyzer.run(fixtures.noReviews);

    expect(actual.statisticsByCharacters).toHaveLength(0);
    expect(actual.reviewDays).toHaveLength(0);
    expect(actual.latestReviewTime).toBeUndefined();
  });

  test.each([
    {
      testCase: fixtures.oneNewCardNoReviews,
      name: "one new card, no reviews",
    },
    {
      testCase: fixtures.oneCardOneReview,
      name: "one card, one review",
    },
    {
      testCase: fixtures.multipleReviews,
      name: "multiple reviews",
    },
  ])("$name", async ({ testCase }) => {
    getCardStatisticsByCharacter.mockImplementation(
      testCase.getCardStatisticsByCharacter,
    );

    const actual = await analyzer.getStatisticsByCharacters(testCase);

    expect(actual.statisticsByCharacters).toEqual(
      testCase.statisticsByCharacters,
    );
    expect(actual.reviewDays).toEqual(testCase.reviewDays);
    expect(actual.latestReviewTime?.toString()).toEqual(
      testCase.latestReviewTime,
    );
  });
});

describe("prepare", () => {
  const initialContextValue: AnalysisContext = {
    reviews: [
      {
        cardId: "1",
        expression: "学",
        reviewTime: "2016-01-15T18:45:21Z",
      },
    ],
    statisticsByCharacters: [],
    latestReviewTime: undefined,
    reviewDays: [],
    timeZoneConfig: [{ timeZone: "UTC" }],
  };

  beforeEach(() => {
    getCardStatisticsByCharacter.mockImplementation(
      fixtures.oneCardOneReview.getCardStatisticsByCharacter,
    );
  });

  test("statisticsByCharacters", async () => {
    const actual = await analyzer.prepare(initialContextValue);
    expect(actual.statisticsByCharacters).toEqual([
      {
        id: "1",
        literal: "学",
        firstAdded: "2016-01-12",
        firstReviewed: "2016-01-15",
        lastReviewed: "2016-01-15",
        numberOfReviews: 1,
        numberOfCards: 1,
      },
    ]);
  });

  test("latestReviewTime", async () => {
    const actual = await analyzer.prepare(initialContextValue);
    expect(actual.latestReviewTime).toBe("2016-01-15T18:45:21.000Z");
  });

  test("reviewDays", async () => {
    const actual = await analyzer.prepare(initialContextValue);
    expect(actual.reviewDays).toEqual(["2016-01-12", "2016-01-15"]);
  });
});

describe("run", () => {
  const contextValue = {
    reviews: [
      {
        cardId: "1",
        expression: "学",
        reviewTime: "2016-01-15T18:45:21Z",
      },
    ],
    statisticsByCharacters: [
      {
        id: "1",
        literal: "学",
        firstAdded: "2016-01-12",
        firstReviewed: "2016-01-15",
        lastReviewed: "2016-01-15",
        numberOfReviews: 1,
        numberOfCards: 1,
      },
    ],
    latestReviewTime: "2016-01-15T18:45:21.000Z",
    reviewDays: ["2016-01-12", "2016-01-15"],
    timeZoneConfig: [{ timeZone: "UTC" }],
  };

  beforeEach(() => {
    mockRandomId("random id");

    statisticsByCharacterRepository.findByLiteral.mockReturnValueOnce(
      fixtures.oneCardOneReview.statisticsByCharacters[0],
    );
  });

  test("merges and saves statistics by character", () => {
    analyzer.run(contextValue);

    const expected: StatisticsByCharacter[] = [
      {
        ...fixtures.oneCardOneReview.statisticsByCharacters[0],
        lastReviewed: "2016-01-15",
        numberOfReviews: 2,
        numberOfCards: 1,
      },
    ];

    expect(statisticsByCharacterRepository.saveAll).toHaveBeenCalledWith(
      expected,
    );
  });
});
