import { Temporal } from "@js-temporal/polyfill";
import { AnkiCard, AnkiClient } from "@vvornanen/aoboshi-anki";
import { TTLSetMultimap } from "@vvornanen/aoboshi-core/collections";
import { getCharactersFromExpression } from "@vvornanen/aoboshi-core/statistics";

export class AnkiService {
  // Initially expired to trigger lazy fetch on first getter call
  private cardIdsByCharacter: TTLSetMultimap<string, number> =
    new TTLSetMultimap(0);
  private ttl = Temporal.Duration.from({ hours: 1 });

  constructor(
    private ankiClient: AnkiClient,
    private deckName: string,
  ) {}

  setTTL(value: Temporal.Duration) {
    this.ttl = value;
  }

  /**
   * Fetches ids of all cards containing the given character.
   *
   * This method is primarily meant for querying multiple characters in
   * a subsequent manner. Fetches all cards once and caches them for a specified
   * TTL. Therefore, the first call may be slow but subsequent calls should be
   * much faster. The cache is thread-scoped since every worker thread has
   * its own instance of the application context.
   *
   * @param literal
   */
  async getCardIdsByLiteral(literal: string) {
    if (!this.cardIdsByCharacter.isExpired()) {
      return this.cardIdsByCharacter.get(literal);
    }

    const startMark = performance.mark("startGetCardIdsByLiteral").name;
    this.cardIdsByCharacter = new TTLSetMultimap(this.ttl);

    // Find all card ids
    const allCardIds = await this.ankiClient.findCardIds(
      `deck:${this.deckName}`,
    );

    // Fetch next 1000 cards
    let start = 0;
    const limit = 1000;

    while (start < allCardIds.length) {
      const cards = await this.ankiClient.getCards(
        allCardIds.slice(start, start + limit),
      );
      this.cacheCardIds(cards);
      start += limit;
    }

    const endMark = performance.mark("endGetCardIdsByLiteral").name;
    performance.measure("getCardIdsByLiteral", startMark, endMark);

    return this.cardIdsByCharacter.get(literal);
  }

  private cacheCardIds(cards: AnkiCard[]) {
    for (const card of cards) {
      const characters = getCharactersFromExpression(getExpression(card));

      for (const literal of characters) {
        this.cardIdsByCharacter.add(literal, card.id);
      }
    }
  }
}

const getExpression = (card: AnkiCard): string => {
  if (card.fields["Expression"] === undefined) {
    throw new Error("Expected card to have field 'Expression'");
  }

  return card.fields["Expression"].value;
};
