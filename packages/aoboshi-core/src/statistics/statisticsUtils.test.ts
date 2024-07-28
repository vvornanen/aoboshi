import { describe, test, expect } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import {
  getCharactersFromExpression,
  getTimeZone,
  timestampToDate,
  TimeZoneConfig,
} from "./statisticsUtils";

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
