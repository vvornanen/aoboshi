import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import {
  StatisticsByCharacter,
  CharacterAnalyzer,
  StatisticsByCharacterRepository,
} from "~/statistics/character";
import * as fixtures from "~/statistics/statisticsFixtures";
import { randomId } from "~";

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
  test("no reviews", async () => {
    const actual = await analyzer.run(fixtures.noReviews);

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

describe("run", () => {
  const testCase = {
    ...fixtures.oneCardOneReview,
    reviews: [
      {
        cardId: "1",
        expression: "学",
        reviewTime: "2016-01-15T18:45:21Z",
      },
    ],
  };

  beforeEach(() => {
    mockRandomId("random id");

    getCardStatisticsByCharacter.mockImplementation(
      testCase.getCardStatisticsByCharacter,
    );

    statisticsByCharacterRepository.findByLiteral.mockReturnValueOnce(
      testCase.statisticsByCharacters[0],
    );
  });

  test("merges and saves statistics by character", async () => {
    await analyzer.run(testCase);

    const expected: StatisticsByCharacter[] = [
      {
        ...testCase.statisticsByCharacters[0],
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
