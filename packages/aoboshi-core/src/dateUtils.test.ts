import { expect, test } from "vitest";
import {
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
