import { afterEach, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { AnkiClient } from "@vvornanen/aoboshi-anki";
import { CardStatisticsByCharacter } from "@vvornanen/aoboshi-core/statistics/character";
import { createAnkiCardStatisticsAdapter } from "~/worker/statistics/ankiCardStatisticsAdapter";

const ankiClient = mock<AnkiClient>();
const ankiCardStatisticsAdapter = createAnkiCardStatisticsAdapter(ankiClient);

afterEach(() => {
  vi.resetAllMocks();
});

test("no cards found", async () => {
  ankiClient.findCardIds.mockResolvedValueOnce([]);

  const actual = await ankiCardStatisticsAdapter("学");

  expect(actual).toBeNull();
  expect(ankiClient.findCardIds).toHaveBeenCalledWith("expression:*学*");
});

test("ankiCardStatisticsAdapter", async () => {
  ankiClient.findCardIds.mockResolvedValueOnce([1684434203213]);

  const actual = await ankiCardStatisticsAdapter("学");

  const expected: CardStatisticsByCharacter = {
    literal: "学",
    firstAdded: "2023-05-18T18:23:23.213Z",
    numberOfCards: 1,
  };

  expect(actual).toEqual(expected);
  expect(ankiClient.findCardIds).toHaveBeenCalledWith("expression:*学*");
});
