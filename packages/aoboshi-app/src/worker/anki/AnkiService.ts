import { Temporal } from "@js-temporal/polyfill";
import {
  AnkiCard,
  AnkiCardReview,
  AnkiClient,
  AnkiGetReviewsResponse,
} from "@vvornanen/aoboshi-anki";
import { TTLSetMultimap } from "@vvornanen/aoboshi-core/collections";
import {
  CardReview,
  NewCard,
  getCharactersFromExpression,
} from "@vvornanen/aoboshi-core/statistics";
import { isInstantAfter } from "@vvornanen/aoboshi-core";
import { ApplicationProperties, Logger } from "~/worker";
import { AppSettingsService } from "~/worker/settings";

export class AnkiService {
  private logger = new Logger("AnkiService");
  private ankiClient: AnkiClient | null = null;

  // Initially expired to trigger lazy fetch on first getter call
  private cardIdsByCharacter: TTLSetMultimap<string, number> =
    new TTLSetMultimap(0);
  private ttl = Temporal.Duration.from({ hours: 1 });

  constructor(
    properties: Pick<ApplicationProperties, "logLevel">,
    private settingsService: AppSettingsService,
  ) {
    this.logger.setLogLevel(properties.logLevel);
  }

  setTTL(value: Temporal.Duration) {
    this.ttl = value;
  }

  getAnkiClient() {
    const settings = this.settingsService.getSettings();

    if (!settings.anki) {
      throw new Error("Anki settings not configured");
    }

    const ankiClient = this.ankiClient
      ? this.ankiClient
      : new AnkiClient(settings.anki?.url, settings.anki?.apiKey);
    const deckName = settings.anki.deckName;

    return { ankiClient, deckName };
  }

  setAnkiClient(ankiClient: AnkiClient) {
    this.ankiClient = ankiClient;
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

    const { ankiClient, deckName } = this.getAnkiClient();

    // Find all card ids
    const allCardIds = await ankiClient.findCardIds(`deck:${deckName}`);

    // Fetch next 1000 cards
    let start = 0;
    const limit = 1000;

    while (start < allCardIds.length) {
      const cards = await ankiClient.getCards(
        allCardIds.slice(start, start + limit),
      );
      this.cacheCardIds(cards);
      start += limit;
    }

    const endMark = performance.mark("endGetCardIdsByLiteral").name;
    performance.measure("getCardIdsByLiteral", startMark, endMark);

    return this.cardIdsByCharacter.get(literal);
  }

  async getLatestReviewTimestamp() {
    const { ankiClient, deckName } = this.getAnkiClient();
    const result = await ankiClient.getLatestReviewTimestamp(deckName);
    return result === null ? null : Temporal.Instant.from(result);
  }

  async fetchReviews(
    start: Temporal.Instant,
    limit = 100,
  ): Promise<{ meta: AnkiGetReviewsResponse["meta"]; reviews: CardReview[] }> {
    const { ankiClient, deckName } = this.getAnkiClient();
    const latestReviewTimestamp = await this.getLatestReviewTimestamp();

    if (!isInstantAfter(latestReviewTimestamp, start)) {
      return {
        meta: {
          start: start.toString(),
          numberOfReviews: 0,
          totalNumberOfReviews: 0,
        },
        reviews: [],
      };
    }

    const { meta, reviews } = await ankiClient.getReviews(
      deckName,
      start.toString(),
      limit,
    );
    const cards = await this.getCardsForReviews(reviews);

    const result = reviews
      .map((review) => {
        const card = cards.get(review.cardId);

        if (!card) {
          this.logger.error(
            `Card ${review.cardId} was not found, review time ${review.reviewTime}`,
          );
          return null;
        }

        return {
          cardId: review.cardId,
          reviewTime: review.reviewTime,
          expression: getExpression(card),
        };
      })
      .filter((review) => review !== null);

    return { meta, reviews: result };
  }

  async fetchNewCards(): Promise<NewCard[]> {
    const { ankiClient, deckName } = this.getAnkiClient();

    const cards = await ankiClient.findCards(`deck:${deckName} is:new`);

    return cards.map((card) => ({
      cardId: card.id,
      expression: getExpression(card),
    }));
  }

  private cacheCardIds(cards: AnkiCard[]) {
    for (const card of cards) {
      const characters = getCharactersFromExpression(getExpression(card));

      for (const literal of characters) {
        this.cardIdsByCharacter.add(literal, card.id);
      }
    }
  }

  private async getCardsForReviews(reviews: AnkiCardReview[]) {
    const { ankiClient } = this.getAnkiClient();
    const cards = await ankiClient.getCards(getUniqueCardIds(reviews));

    const cardsMap = new Map<number, AnkiCard>();
    cards.forEach((card) => cardsMap.set(card.id, card));

    return cardsMap;
  }
}

const getExpression = (card: AnkiCard): string => {
  if (card.fields["Expression"] === undefined) {
    throw new Error("Expected card to have field 'Expression'");
  }

  return card.fields["Expression"].value;
};

const getUniqueCardIds = (reviews: AnkiCardReview[]) => {
  const cardIds = new Set<number>(reviews.map((review) => review.cardId));
  return Array.from(cardIds);
};
