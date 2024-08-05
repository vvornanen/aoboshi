import { AnkiClient } from "@vvornanen/aoboshi-anki";
import { KANJI_REGEXP } from "@vvornanen/aoboshi-core/characters";
import { Temporal } from "@js-temporal/polyfill";
import { GetCardStatisticsByCharacter } from "@vvornanen/aoboshi-core/statistics/character";

/** Creates a callback function which fetches card information from Anki */
export const createAnkiCardStatisticsAdapter =
  (ankiClient: AnkiClient): GetCardStatisticsByCharacter =>
  async (literal: string) => {
    if (!isValidCharacter(literal)) {
      console.warn(`Invalid character: ${literal}`);
      return null;
    }

    const cardIds = await ankiClient.findCardIds(`expression:*${literal}*`);

    if (cardIds.length === 0) {
      return null;
    }

    const firstCardId = Math.min(...cardIds);
    const firstAdded = Temporal.Instant.fromEpochMilliseconds(firstCardId);

    return {
      literal,
      firstAdded: firstAdded.toString({ smallestUnit: "millisecond" }),
      numberOfCards: cardIds.length,
    };
  };

const isValidCharacter = (literal: string) => !!literal.match(KANJI_REGEXP);
