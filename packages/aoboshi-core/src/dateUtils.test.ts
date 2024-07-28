import { test, expect } from "vitest";
import { maxDate, minDate } from "./dateUtils";

test("minDate", () => {
  expect(minDate("2024-01-02", "2024-01-01", "2024-01-03").toString()).toEqual(
    "2024-01-01",
  );
});

test("maxDate", () => {
  expect(maxDate("2024-01-02", "2024-01-01", "2024-01-03").toString()).toEqual(
    "2024-01-03",
  );
});
