import { afterEach, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { AnkiCard, AnkiClient } from "@vvornanen/aoboshi-anki";
import { CardStatisticsByCharacter } from "@vvornanen/aoboshi-core/statistics/character";
import { createAnkiCardStatisticsAdapter } from "~/worker/statistics/ankiCardStatisticsAdapter";

const ankiClient = mock<AnkiClient>();
const ankiCardStatisticsAdapter = createAnkiCardStatisticsAdapter(ankiClient);

afterEach(() => {
  vi.resetAllMocks();
});

test("no cards found", async () => {
  ankiClient.findCards.mockResolvedValueOnce([]);

  const actual = await ankiCardStatisticsAdapter("学");

  expect(actual).toBeNull();
  expect(ankiClient.findCards).toHaveBeenCalledWith("expression:*学*");
});

test("ankiCardStatisticsAdapter", async () => {
  ankiClient.findCards.mockResolvedValueOnce([
    {
      id: 1684434203213,
      created: "2023-05-18T18:23:23.213Z",
      modified: "2022-03-01T17:47:44Z",
      fields: {
        Expression: {
          value: "音楽",
          order: 0,
        },
        Meaning: {
          value: "",
          order: 1,
        },
        Reading: {
          value: "",
          order: 2,
        },
      },
      modelName: "Japanese",
      deckName: "test",
      easeFactor: 1750,
      interval: "P935D",
      noteId: 1684434396302,
      status: "review",
      numberOfReviews: 13,
      numberOfLapses: 0,
      numberOfRemainingReviews: {
        today: 0,
        untilGraduation: 0,
      },
    },
  ] satisfies AnkiCard[]);

  const actual = await ankiCardStatisticsAdapter("学");

  const expected: CardStatisticsByCharacter = {
    literal: "学",
    firstAdded: "2023-05-18T18:23:23.213Z",
    numberOfCards: 1,
  };

  expect(actual).toEqual(expected);
  expect(ankiClient.findCards).toHaveBeenCalledWith("expression:*学*");
});
