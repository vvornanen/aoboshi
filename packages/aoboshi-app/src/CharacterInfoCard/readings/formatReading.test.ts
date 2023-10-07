import { test, expect } from "vitest";
import { formatReading } from "./formatReading";

test.each([
  ["", ""],
  ["ダイ", "ダイ"],
  ["か.わる", "か-わる"],
  ["-がわ.り", "〜がわ-り"],
])("formatReading [%s]", (reading, expected) => {
  expect(formatReading(reading)).toEqual(expected);
});
