import { test, expect } from "vitest";
import { getCodePoint, KANA_REGEXP, KANJI_REGEXP } from ".";

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

test.each([
  { value: "", matches: false },
  { value: "a", matches: false },
  { value: "あ", matches: false },
  { value: "。", matches: false },
  { value: "学", matches: true },
  { value: "学ぶ", matches: false },
  { value: "大学", matches: false },
  { value: "𠮟", matches: true },
  { value: "々", matches: true },
])("KANJI_REGEXP %s", ({ value, matches }) => {
  if (matches) {
    expect(value).toMatch(KANJI_REGEXP);
  } else {
    expect(value).not.toMatch(KANJI_REGEXP);
  }
});

test.each([
  { value: "", matches: false },
  { value: "a", matches: false },
  { value: "あ", matches: true },
  { value: "ああ", matches: false },
  { value: "ぁ", matches: true },
  { value: "ん", matches: true },
  { value: "ア", matches: true },
  { value: "ァ", matches: true },
  { value: "ン", matches: true },
  { value: "。", matches: false },
  { value: "学", matches: false },
  { value: "学ぶ", matches: false },
  { value: "々", matches: false },
])("KANA_REGEXP %s", ({ value, matches }) => {
  if (matches) {
    expect(value).toMatch(KANA_REGEXP);
  } else {
    expect(value).not.toMatch(KANA_REGEXP);
  }
});
