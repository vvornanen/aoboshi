import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { randomId } from "../randomId";
import {
  getCharactersFromExpression,
  getTimeZone,
  mergeStatisticsByCharacter,
  mergeStatisticsByDay,
  timestampToDate,
  TimeZoneConfig,
} from "./statisticsUtils";
import * as fixtures from "./statisticsFixtures";

vi.mock("../randomId", () => {
  return {
    randomId: vi.fn(),
  };
});

const mockRandomId = () => {
  let autoIncrement = 1;

  if (vi.isMockFunction(randomId)) {
    randomId.mockImplementation(() => String(autoIncrement++));
  }
};

const mockRandomIdOnce = (value: string) => {
  if (vi.isMockFunction(randomId)) {
    randomId.mockReturnValueOnce(value);
  }
};

const multipleTimeZones: TimeZoneConfig[] = [
  {
    timeZone: "Europe/Helsinki",
    validFrom: "2020-01-01T00:00:00.000+0200",
    validTo: "2020-12-31T23:59:59.999+0200",
  },
  {
    timeZone: "Asia/Tokyo",
    validFrom: "2023-01-01T00:00:00.000Z",
    validTo: "2023-12-31T23:59:59.999Z",
  },
  {
    timeZone: "Europe/Helsinki",
    validFrom: "2024-01-01T00:00:00.000Z",
    validTo: "2024-12-31T23:59:59.999Z",
  },
];

beforeEach(() => {
  mockRandomId();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("getTimeZone", () => {
  test.each([
    { timestamp: "2019-12-31T23:59:59.999+0200", expected: "UTC" },
    { timestamp: "2020-01-01T02:00:00.000+0800", expected: "UTC" },
    { timestamp: "2020-01-01T02:00:00.000Z", expected: "Europe/Helsinki" },
    { timestamp: "2020-01-01T00:00:00.000+0200", expected: "Europe/Helsinki" },
    { timestamp: "2020-12-31T23:59:59.999+0200", expected: "Europe/Helsinki" },
    { timestamp: "2022-12-31T23:59:59.999Z", expected: "UTC" },
    { timestamp: "2023-01-01T00:00:00.000Z", expected: "Asia/Tokyo" },
    { timestamp: "2023-01-02T00:00:00.000Z", expected: "Asia/Tokyo" },
    { timestamp: "2023-12-31T23:59:59.999Z", expected: "Asia/Tokyo" },
    { timestamp: "2023-12-31T22:00:00.000-0800", expected: "Europe/Helsinki" },
    { timestamp: "2024-01-01T00:00:00.000Z", expected: "Europe/Helsinki" },
    { timestamp: "2025-01-01T00:00:00.000Z", expected: "UTC" },
  ])("with time zone config %s", ({ timestamp, expected }) => {
    const actual = getTimeZone(
      Temporal.Instant.from(timestamp),
      multipleTimeZones,
    );

    expect(String(actual)).toEqual(expected);
  });

  test("empty time zone config", () => {
    const timestamp = Temporal.Instant.from("2024-01-01T00:00:00Z");
    const actual = getTimeZone(timestamp, []);
    expect(String(actual)).toEqual("UTC");
  });

  test("invalid time zone", () => {
    const timestamp = Temporal.Instant.from("2024-01-01T00:00:00Z");
    const invalidConfig: TimeZoneConfig[] = [
      { timeZone: "Europe/Tampere", validFrom: "2000-01-01T00:00:00.000Z" },
    ];

    // This expected error is Temporal polyfill -specific and may change in the future
    const expectedError = "Invalid time zone specified: Europe/Tampere";

    expect(() => getTimeZone(timestamp, invalidConfig)).toThrowError(
      expectedError,
    );
  });

  test("infinite validity", () => {
    const timestamp = Temporal.Instant.from("2024-01-01T00:00:00Z");
    const infiniteConfig: TimeZoneConfig[] = [{ timeZone: "Europe/Helsinki" }];

    const actual = getTimeZone(timestamp, infiniteConfig);

    expect(String(actual)).toEqual("Europe/Helsinki");
  });

  test.each([
    { timestamp: "2020-01-01T00:00:00.000Z", expected: "Europe/Helsinki" },
    { timestamp: "2024-12-31T00:00:00.000Z", expected: "Europe/Helsinki" },
    { timestamp: "2025-01-01T00:00:00.000Z", expected: "UTC" },
  ])("valid to %s", ({ timestamp, expected }) => {
    const validToConfig: TimeZoneConfig[] = [
      { timeZone: "Europe/Helsinki", validTo: "2024-12-31T23:59:59.999Z" },
    ];
    const actual = getTimeZone(Temporal.Instant.from(timestamp), validToConfig);
    expect(String(actual)).toEqual(expected);
  });

  test.each([
    { timestamp: "2020-01-01T00:00:00.000Z", expected: "UTC" },
    { timestamp: "2024-01-01T00:00:00.000Z", expected: "Europe/Helsinki" },
    { timestamp: "2025-01-01T00:00:00.000Z", expected: "Europe/Helsinki" },
  ])("valid from %s", ({ timestamp, expected }) => {
    const validFromConfig: TimeZoneConfig[] = [
      { timeZone: "Europe/Helsinki", validFrom: "2024-01-01T00:00:00.000Z" },
    ];
    const actual = getTimeZone(
      Temporal.Instant.from(timestamp),
      validFromConfig,
    );
    expect(String(actual)).toEqual(expected);
  });
});

describe("timestampToDate", () => {
  test.each([
    { timestamp: "2019-12-31T23:59:59.999+0200", expected: "2019-12-31" },
    { timestamp: "2020-01-01T02:00:00.000+0900", expected: "2019-12-31" },
    { timestamp: "2020-01-01T02:00:00.000Z", expected: "2020-01-01" },
    { timestamp: "2020-01-01T00:00:00.000+0200", expected: "2020-01-01" },
    { timestamp: "2020-12-31T23:59:59.999+0200", expected: "2020-12-31" },
    { timestamp: "2022-12-31T23:59:59.999Z", expected: "2022-12-31" },
    { timestamp: "2023-01-01T00:00:00.000Z", expected: "2023-01-01" },
    { timestamp: "2023-01-02T00:00:00.000Z", expected: "2023-01-02" },
    { timestamp: "2023-12-31T23:59:59.999Z", expected: "2024-01-01" },
    { timestamp: "2023-12-31T22:00:00.000-0800", expected: "2024-01-01" },
    { timestamp: "2024-01-01T00:00:00.000Z", expected: "2024-01-01" },
    { timestamp: "2025-01-01T00:00:00.000Z", expected: "2025-01-01" },
  ])("with time zone config %s", ({ timestamp, expected }) => {
    const actual = timestampToDate(timestamp, multipleTimeZones);
    expect(actual.toString()).toEqual(expected);
  });
});

describe("getCharactersFromExpression", () => {
  test.each([
    { expression: "", expected: [] },
    { expression: "a", expected: [] },
    { expression: "あ", expected: [] },
    { expression: "学", expected: ["学"] },
    { expression: "学ぶ", expected: ["学"] },
    { expression: "大阪大学", expected: ["大", "阪", "学"] },
    { expression: "大学", expected: ["大", "学"] },
    { expression: "𠮟", expected: ["𠮟"] },
  ])("unique characters %s", ({ expression, expected }) => {
    const actual = getCharactersFromExpression(expression);
    expect(actual).toEqual(expected);
  });
});

describe("mergeStatisticsByCharacter", () => {
  test("throws error if literals do not match", () => {
    expect(() => {
      mergeStatisticsByCharacter(
        fixtures.multipleReviews.statisticsByCharacters[0],
        fixtures.multipleReviews.statisticsByCharacters[1],
      );
    }).toThrowError("Expected literals to equal but got 学 and 大");
  });

  test("generates new id if no existing data", () => {
    mockRandomIdOnce("random id");

    const actual = mergeStatisticsByCharacter(undefined, {
      literal: "学",
      firstAdded: "2016-01-12",
      firstReviewed: "2016-01-13",
      lastReviewed: "2016-01-14",
      numberOfReviews: 3,
      numberOfCards: 2,
    });

    expect(actual.id).toEqual("random id");
  });

  test("preserves existing id", () => {
    const actual = mergeStatisticsByCharacter(
      {
        ...fixtures.multipleReviews.statisticsByCharacters[0],
        id: "existing id",
      },
      {
        literal: "学",
        firstAdded: "2016-01-12",
        firstReviewed: "2016-01-13",
        lastReviewed: "2016-01-14",
        numberOfReviews: 3,
        numberOfCards: 2,
      },
    );

    expect(actual.id).toEqual("existing id");
  });

  test.each([
    { first: "2016-01-12", second: "2016-01-13", expected: "2016-01-12" },
    { first: "2016-01-12", second: "2016-01-11", expected: "2016-01-11" },
    { first: null, second: "2016-01-11", expected: "2016-01-11" },
    { first: "2016-01-12", second: null, expected: "2016-01-12" },
    { first: null, second: null, expected: null },
  ])(
    "preserves earliest first added date %s",
    ({ first, second, expected }) => {
      const actual = mergeStatisticsByCharacter(
        {
          ...fixtures.multipleReviews.statisticsByCharacters[0],
          firstAdded: first,
        },
        {
          ...fixtures.multipleReviews.statisticsByCharacters[0],
          firstAdded: second,
        },
      );

      expect(actual.firstAdded).toEqual(expected);
    },
  );

  test.each([
    { first: "2016-01-12", second: "2016-01-13", expected: "2016-01-12" },
    { first: "2016-01-12", second: "2016-01-11", expected: "2016-01-11" },
    { first: null, second: "2016-01-11", expected: "2016-01-11" },
    { first: "2016-01-12", second: null, expected: "2016-01-12" },
    { first: null, second: null, expected: null },
  ])(
    "preserves earliest first reviewed date %s",
    ({ first, second, expected }) => {
      const actual = mergeStatisticsByCharacter(
        {
          ...fixtures.multipleReviews.statisticsByCharacters[0],
          firstReviewed: first,
        },
        {
          ...fixtures.multipleReviews.statisticsByCharacters[0],
          firstReviewed: second,
        },
      );

      expect(actual.firstReviewed).toEqual(expected);
    },
  );

  test.each([
    { first: "2016-01-12", second: "2016-01-13", expected: "2016-01-13" },
    { first: "2016-01-12", second: "2016-01-11", expected: "2016-01-12" },
    { first: null, second: "2016-01-11", expected: "2016-01-11" },
    { first: "2016-01-12", second: null, expected: "2016-01-12" },
    { first: null, second: null, expected: null },
  ])(
    "preserves latest last reviewed date %s",
    ({ first, second, expected }) => {
      const actual = mergeStatisticsByCharacter(
        {
          ...fixtures.multipleReviews.statisticsByCharacters[0],
          lastReviewed: first,
        },
        {
          ...fixtures.multipleReviews.statisticsByCharacters[0],
          lastReviewed: second,
        },
      );

      expect(actual.lastReviewed).toEqual(expected);
    },
  );

  test.each([
    { first: 0, second: 0, expected: 0 },
    { first: 1, second: 0, expected: 1 },
    { first: 0, second: 2, expected: 2 },
    { first: 1, second: 2, expected: 3 },
  ])("sums number of reviews %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByCharacter(
      {
        ...fixtures.multipleReviews.statisticsByCharacters[0],
        numberOfReviews: first,
      },
      {
        ...fixtures.multipleReviews.statisticsByCharacters[0],
        numberOfReviews: second,
      },
    );

    expect(actual.numberOfReviews).toEqual(expected);
  });

  test.each([
    { first: 0, second: 0, expected: 0 },
    { first: 1, second: 0, expected: 0 },
    { first: 0, second: 2, expected: 2 },
    { first: 1, second: 2, expected: 2 },
  ])("always overrides number of cards %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByCharacter(
      {
        ...fixtures.multipleReviews.statisticsByCharacters[0],
        numberOfCards: first,
      },
      {
        ...fixtures.multipleReviews.statisticsByCharacters[0],
        numberOfCards: second,
      },
    );

    expect(actual.numberOfCards).toEqual(expected);
  });
});

describe("mergeStatisticsByDay", () => {
  test("throws error if dates are not equal", () => {
    expect(() => {
      mergeStatisticsByDay(
        fixtures.statisticsByDay("2016-01-12"),
        fixtures.statisticsByDay("2016-01-13"),
      );
    }).toThrowError(
      "Expected dates to equal but got 2016-01-12 and 2016-01-13",
    );
  });

  test("generates new id if no existing data", () => {
    mockRandomIdOnce("random id");

    const actual = mergeStatisticsByDay(undefined, {
      date: "2016-01-13",
      addedCharacters: "",
      firstSeenCharacters: "",
      reviewedCharacters: "",
      numberOfAddedCharacters: 0,
      numberOfFirstSeenCharacters: 0,
      numberOfReviewedCharacters: 0,
      numberOfReviews: 0,
    });

    expect(actual.id).toEqual("random id");
  });

  test("preserves existing id", () => {
    const actual = mergeStatisticsByDay(
      fixtures.statisticsByDay({ id: "existing id", date: "2016-01-13" }),
      fixtures.statisticsByDay("2016-01-13"),
    );

    expect(actual.id).toEqual("existing id");
  });

  test.each([
    { first: "", second: "", expected: "" },
    { first: "学", second: "", expected: "学" },
    { first: "", second: "学", expected: "学" },
    { first: "学", second: "学", expected: "学" },
    { first: "学大", second: "学", expected: "学大" },
    { first: "学大", second: "日", expected: "学大日" },
    { first: "𠮟", second: "𠮟", expected: "𠮟" },
  ])("merges added characters %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByDay(
      { ...fixtures.statisticsByDay("2016-01-12"), addedCharacters: first },
      { ...fixtures.statisticsByDay("2016-01-12"), addedCharacters: second },
    );

    expect(actual.addedCharacters).toEqual(expected);
  });

  test.each([
    { first: "", second: "", expected: "" },
    { first: "学", second: "", expected: "学" },
    { first: "", second: "学", expected: "学" },
    { first: "学", second: "学", expected: "学" },
    { first: "学大", second: "学", expected: "学大" },
    { first: "学大", second: "日", expected: "学大日" },
    { first: "𠮟", second: "𠮟", expected: "𠮟" },
  ])("merges first seen characters %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByDay(
      { ...fixtures.statisticsByDay("2016-01-12"), firstSeenCharacters: first },
      {
        ...fixtures.statisticsByDay("2016-01-12"),
        firstSeenCharacters: second,
      },
    );

    expect(actual.firstSeenCharacters).toEqual(expected);
  });

  test.each([
    { first: "", second: "", expected: "" },
    { first: "学", second: "", expected: "学" },
    { first: "", second: "学", expected: "学" },
    { first: "学", second: "学", expected: "学" },
    { first: "学大", second: "学", expected: "学大" },
    { first: "学大", second: "日", expected: "学大日" },
    { first: "𠮟", second: "𠮟", expected: "𠮟" },
  ])("merges reviewed characters %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByDay(
      { ...fixtures.statisticsByDay("2016-01-12"), reviewedCharacters: first },
      { ...fixtures.statisticsByDay("2016-01-12"), reviewedCharacters: second },
    );

    expect(actual.reviewedCharacters).toEqual(expected);
  });

  test.each([
    { first: "", second: "", expected: 0 },
    { first: "学", second: "", expected: 1 },
    { first: "", second: "学", expected: 1 },
    { first: "学", second: "学", expected: 1 },
    { first: "学大", second: "学", expected: 2 },
    { first: "学大", second: "日", expected: 3 },
    { first: "𠮟", second: "𠮟", expected: 1 },
  ])("sums number of added characters %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByDay(
      { ...fixtures.statisticsByDay("2016-01-12"), addedCharacters: first },
      { ...fixtures.statisticsByDay("2016-01-12"), addedCharacters: second },
    );

    expect(actual.numberOfAddedCharacters).toEqual(expected);
  });

  test.each([
    { first: "", second: "", expected: 0 },
    { first: "学", second: "", expected: 1 },
    { first: "", second: "学", expected: 1 },
    { first: "学", second: "学", expected: 1 },
    { first: "学大", second: "学", expected: 2 },
    { first: "学大", second: "日", expected: 3 },
    { first: "𠮟", second: "𠮟", expected: 1 },
  ])(
    "sums number of first seen characters %s",
    ({ first, second, expected }) => {
      const actual = mergeStatisticsByDay(
        {
          ...fixtures.statisticsByDay("2016-01-12"),
          firstSeenCharacters: first,
        },
        {
          ...fixtures.statisticsByDay("2016-01-12"),
          firstSeenCharacters: second,
        },
      );

      expect(actual.numberOfFirstSeenCharacters).toEqual(expected);
    },
  );

  test.each([
    { first: "", second: "", expected: 0 },
    { first: "学", second: "", expected: 1 },
    { first: "", second: "学", expected: 1 },
    { first: "学", second: "学", expected: 1 },
    { first: "学大", second: "学", expected: 2 },
    { first: "学大", second: "日", expected: 3 },
    { first: "𠮟", second: "𠮟", expected: 1 },
  ])("sums number of reviewed characters %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByDay(
      { ...fixtures.statisticsByDay("2016-01-12"), reviewedCharacters: first },
      { ...fixtures.statisticsByDay("2016-01-12"), reviewedCharacters: second },
    );

    expect(actual.numberOfReviewedCharacters).toEqual(expected);
  });

  test.each([
    { first: 0, second: 0, expected: 0 },
    { first: 1, second: 0, expected: 1 },
    { first: 0, second: 1, expected: 1 },
    { first: 1, second: 1, expected: 2 },
    { first: 2, second: 1, expected: 3 },
  ])("sums number of reviews %s", ({ first, second, expected }) => {
    const actual = mergeStatisticsByDay(
      { ...fixtures.statisticsByDay("2016-01-12"), numberOfReviews: first },
      { ...fixtures.statisticsByDay("2016-01-12"), numberOfReviews: second },
    );

    expect(actual.numberOfReviews).toEqual(expected);
  });
});
