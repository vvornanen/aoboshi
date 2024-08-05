import { expect, test } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import {
  isInstantAfter,
  maxDate,
  minDate,
  nullableMaxDate,
  nullableMinDate,
} from "./dateUtils";

test.each([
  {
    values: ["2024-01-02"],
    expected: "2024-01-02",
  },
  {
    values: ["2024-01-02", "2024-01-01"],
    expected: "2024-01-01",
  },
  {
    values: ["2024-01-02", "2024-01-01", "2024-01-03"],
    expected: "2024-01-01",
  },
])("minDate %s", ({ values, expected }) => {
  expect(minDate(...values).toString()).toEqual(expected);
});

test("minDate throws error on empty arguments", () => {
  expect(() => minDate()).toThrowError(
    "Expected at least one date as argument",
  );
});

test.each([
  {
    values: [],
    expected: undefined,
  },
  {
    values: [null],
    expected: undefined,
  },
  {
    values: [undefined],
    expected: undefined,
  },
  {
    values: [undefined, "2024-01-02"],
    expected: "2024-01-02",
  },
  {
    values: ["2024-01-02", null, "2024-01-01"],
    expected: "2024-01-01",
  },
])("nullableMinDate %s", ({ values, expected }) => {
  expect(nullableMinDate(...values)?.toString()).toEqual(expected);
});

test.each([
  {
    values: ["2024-01-02"],
    expected: "2024-01-02",
  },
  {
    values: ["2024-01-02", "2024-01-01"],
    expected: "2024-01-02",
  },
  {
    values: ["2024-01-02", "2024-01-01", "2024-01-03"],
    expected: "2024-01-03",
  },
])("maxDate %s", ({ values, expected }) => {
  expect(maxDate(...values).toString()).toEqual(expected);
});

test("maxDate throws error on empty arguments", () => {
  expect(() => maxDate()).toThrowError(
    "Expected at least one date as argument",
  );
});

test.each([
  {
    values: [],
    expected: undefined,
  },
  {
    values: [null],
    expected: undefined,
  },
  {
    values: [undefined],
    expected: undefined,
  },
  {
    values: [undefined, "2024-01-02"],
    expected: "2024-01-02",
  },
  {
    values: ["2024-01-02", null, "2024-01-01"],
    expected: "2024-01-02",
  },
])("nullableMaxDate %s", ({ values, expected }) => {
  expect(nullableMaxDate(...values)?.toString()).toEqual(expected);
});

test.each([
  { first: null, second: null, expected: false },
  { first: undefined, second: undefined, expected: false },
  { first: "", second: "", expected: false },
  { first: "2024-01-01T00:00:00.000Z", second: undefined, expected: false },
  { first: undefined, second: "2024-01-01T00:00:00.000Z", expected: false },
  {
    first: "2024-01-01T00:00:00.000Z",
    second: "2024-01-01T00:00:00.000Z",
    expected: false,
  },
  {
    first: "2024-01-01T00:00:00.000Z",
    second: "2024-01-01T00:00:00.001Z",
    expected: false,
  },
  {
    first: "2024-01-01T00:00:00.001Z",
    second: "2024-01-01T00:00:00.000Z",
    expected: true,
  },
  {
    first: Temporal.Instant.from("2024-01-01T00:00:00.000Z"),
    second: Temporal.Instant.from("2024-01-01T00:00:00.000Z"),
    expected: false,
  },
  {
    first: Temporal.Instant.from("2024-01-01T00:00:00.001Z"),
    second: Temporal.Instant.from("2024-01-01T00:00:00.000Z"),
    expected: true,
  },
])("isInstantAfter %s", ({ first, second, expected }) => {
  expect(isInstantAfter(first, second)).toBe(expected);
});
