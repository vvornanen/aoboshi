import { AnkiCard, AnkiClient } from "@vvornanen/aoboshi-anki";
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

    // TODO: Use AnkiClient.findCardIds()
    const cards = await ankiClient.findCards(`expression:*${literal}*`);

    if (cards.length === 0) {
      return null;
    }

    const firstAdded = getFirstAdded(cards);

    return {
      literal,
      firstAdded: firstAdded.toString({ smallestUnit: "millisecond" }),
      numberOfCards: cards.length,
    };
  };

const isValidCharacter = (literal: string) => !!literal.match(KANJI_REGEXP);

const getFirstAdded = (cards: AnkiCard[]): Temporal.Instant =>
  cards.reduce((prev, card) => {
    const created = Temporal.Instant.from(card.created);
    return Temporal.Instant.compare(prev, created) < 0 ? prev : created;
  }, Temporal.Now.instant());
