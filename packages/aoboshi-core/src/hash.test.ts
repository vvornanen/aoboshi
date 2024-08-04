import { expect, test } from "vitest";
import { hash } from "./hash";

test.each([
  { value: "", expected: 0 },
  { value: "1", expected: 49 },
  { value: "a", expected: 97 },
  { value: "foo", expected: 101574 },
  { value: "foo", max: 255, expected: 84 },
  { value: "あ", expected: 12354 },
  { value: "あ", max: 255, expected: 114 },
  { value: "常用漢字", expected: 748286565 },
  { value: "常用漢字", max: 255, expected: 30 },
])("hash %s", ({ value, max, expected }) => {
  expect(hash(value, max)).toEqual(expected);
});
