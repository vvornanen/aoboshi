import { test, expect } from "vitest";
import { getCodePoint } from "./Character";

test.each([
  { literal: "", expectedError: "Literal must not be empty" },
  { literal: "01", expectedError: "Expected single character but got [01]" },
  { literal: "0", expected: 48 },
  { literal: "a", expected: 97 },
  { literal: "あ", expected: 12354 },
  { literal: "一", expected: 19968 },
  { literal: "𠮟", expected: 134047 },
])("getCodePoint %s", ({ literal, expected, expectedError }) => {
  if (expectedError) {
    expect(() => getCodePoint(literal)).toThrowError(expectedError);
  } else {
    expect(getCodePoint(literal)).toEqual(expected);
  }
});
