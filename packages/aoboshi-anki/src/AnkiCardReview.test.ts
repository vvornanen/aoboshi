import { describe, test, expect } from "vitest";
import {
  AnkiCardReview,
  fromTuple,
  getReviewType,
  intervalToDuration,
  ReviewType,
} from "./AnkiCardReview";

describe("getReviewType", () => {
  test.each([
    { value: 0, expected: ReviewType.Learn },
    { value: 1, expected: ReviewType.Review },
    { value: 2, expected: ReviewType.Relearn },
    { value: 3, expected: ReviewType.Cram },
  ])("%s", ({ value, expected }) => {
    expect(getReviewType(value)).toEqual(expected);
  });

  test.each([-1, 4])("throws error on %s", (value) => {
    expect(() => getReviewType(value)).toThrowError(
      `Unknown review type ${value}`,
    );
  });
});

describe("intervalToDuration", () => {
  test("seconds", () => {
    expect(intervalToDuration(-60).toString()).toEqual("PT60S");
  });

  test("days", () => {
    expect(intervalToDuration(3).toString()).toEqual("P3D");
  });
});

describe("fromTuple", () => {
  test("fromTuple", () => {
    const expected: AnkiCardReview = {
      reviewTime: "2016-01-13T19:57:33.016Z",
      cardId: 1452713530101,
      usn: 5,
      ease: 4,
      newInterval: "P3D",
      previousInterval: "PT60S",
      newFactor: 2500,
      reviewDuration: "PT4.248S",
      reviewType: ReviewType.Learn,
    };
    const actual = fromTuple([
      1452715053016, 1452713530101, 5, 4, 3, -60, 2500, 4248, 0,
    ]);

    expect(actual).toEqual(expected);
  });
});
