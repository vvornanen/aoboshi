import { afterEach, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { CardStatisticsByCharacter } from "@vvornanen/aoboshi-core/statistics/character";
import { createAnkiCardStatisticsAdapter } from "~/worker/anki/ankiCardStatisticsAdapter";
import { AnkiService } from "~/worker/anki/index";

const ankiService = mock<AnkiService>();
const ankiCardStatisticsAdapter = createAnkiCardStatisticsAdapter(ankiService);

afterEach(() => {
  vi.resetAllMocks();
});

test("no cards found", async () => {
  ankiService.getCardIdsByLiteral.mockResolvedValueOnce([]);

  const actual = await ankiCardStatisticsAdapter("学");

  expect(actual).toBeNull();
  expect(ankiService.getCardIdsByLiteral).toHaveBeenCalledWith("学");
});

test("one card found", async () => {
  ankiService.getCardIdsByLiteral.mockResolvedValueOnce([1684434203213]);

  const actual = await ankiCardStatisticsAdapter("学");

  const expected: CardStatisticsByCharacter = {
    literal: "学",
    firstAdded: "2023-05-18T18:23:23.213Z",
    numberOfCards: 1,
  };

  expect(actual).toEqual(expected);
  expect(ankiService.getCardIdsByLiteral).toHaveBeenCalledWith("学");
});

test("multiple cards found", async () => {
  ankiService.getCardIdsByLiteral.mockResolvedValueOnce([
    1684411200000, 1684414800000, 1684407600000,
  ]);

  const actual = await ankiCardStatisticsAdapter("学");

  const expected: CardStatisticsByCharacter = {
    literal: "学",
    firstAdded: "2023-05-18T11:00:00.000Z",
    numberOfCards: 3,
  };

  expect(actual).toEqual(expected);
  expect(ankiService.getCardIdsByLiteral).toHaveBeenCalledWith("学");
});
