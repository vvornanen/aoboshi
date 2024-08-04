import { expect, test } from "vitest";
import { AnkiCard, fromInternalCard, getCardStatus } from "~/AnkiCard";
import { card1, internalCard1 } from "~/fixtures";

test("fromInternalCard", () => {
  const actual = fromInternalCard({
    ...internalCard1,
    reps: 23,
    lapses: 4,
    left: 3005,
  });

  expect(actual).toEqual({
    ...card1,
    numberOfReviews: 23,
    numberOfLapses: 4,
    numberOfRemainingReviews: { today: 3, untilGraduation: 5 },
  } satisfies AnkiCard);
});

test.each([
  { value: -1, expectedError: "Unknown card status -1" },
  { value: 0, expected: "new" },
  { value: 1, expected: "learning" },
  { value: 2, expected: "review" },
  { value: 3, expected: "relearning" },
  { value: 4, expectedError: "Unknown card status 4" },
])("getCardStatus %s", ({ value, expected, expectedError }) => {
  if (expectedError) {
    expect(() => getCardStatus(value)).toThrowError(expectedError);
  } else {
    expect(getCardStatus(value)).toEqual(expected);
  }
});
