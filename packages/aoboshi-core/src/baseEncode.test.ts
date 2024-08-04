import { expect, test } from "vitest";
import {
  BASE_16,
  BASE_2,
  BASE_58,
  BASE_62,
  BASE_8,
  baseEncode,
} from "./baseEncode";

test.each([
  {
    value: -1,
    characters: BASE_2,
    expectedError: "Value must be non-negative integer",
  },
  {
    value: 0,
    characters: "",
    expectedError: "Characters must contain at least 2 characters",
  },
  { value: 0, characters: BASE_2, expected: "0" },
  { value: 1, characters: BASE_2, expected: "1" },
  { value: 2, characters: BASE_2, expected: "10" },
  { value: 3, characters: BASE_2, expected: "11" },
  { value: 4, characters: BASE_2, expected: "100" },
  { value: 0b100, characters: BASE_2, expected: "100" },
  { value: 255, characters: BASE_2, expected: "11111111" },
  { value: 0, characters: BASE_8, expected: "0" },
  { value: 1, characters: BASE_8, expected: "1" },
  { value: 7, characters: BASE_8, expected: "7" },
  { value: 8, characters: BASE_8, expected: "10" },
  { value: 0o77, characters: BASE_8, expected: "77" },
  { value: 0o7777, characters: BASE_8, expected: "7777" },
  { value: 0x0, characters: BASE_16, expected: "0" },
  { value: 0x1, characters: BASE_16, expected: "1" },
  { value: 0xf, characters: BASE_16, expected: "f" },
  { value: 0x10, characters: BASE_16, expected: "10" },
  { value: 0xff, characters: BASE_16, expected: "ff" },
  { value: 0, characters: BASE_58, expected: "1" },
  { value: 57, characters: BASE_58, expected: "z" },
  { value: 58, characters: BASE_58, expected: "21" },
  { value: 255, characters: BASE_58, expected: "5Q" },
  { value: 0, characters: BASE_62, expected: "0" },
  { value: 1, characters: BASE_62, expected: "1" },
  { value: 61, characters: BASE_62, expected: "z" },
  { value: 62, characters: BASE_62, expected: "10" },
  { value: 255, characters: BASE_62, expected: "47" },
  {
    value: 16723309294332875777n,
    characters: BASE_62,
    expected: "JvMvuFrFG1B",
  },
])("baseEncode %s", ({ value, characters, expected, expectedError }) => {
  if (expectedError) {
    expect(() => baseEncode(value, characters)).toThrow(expectedError);
  } else {
    expect(baseEncode(value, characters)).toEqual(expected);
  }
});
