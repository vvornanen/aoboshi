import { Temporal } from "@js-temporal/polyfill";
import { AnkiCard, AnkiInternalCard, fromInternalCard } from "./AnkiCard";
import { AnkiNote } from "./AnkiNote";
import {
  AnkiCardReview,
  AnkiCardReviewTuple,
  fromTuple,
} from "./AnkiCardReview";
import { AnkiAction, AnkiRequest } from "./AnkiRequest";
import { AnkiResponse } from "./AnkiResponse";

/**
 * Client for AnkiConnect API.
 *
 * @see https://foosoft.net/projects/anki-connect/
 */
export class AnkiClient {
  constructor(
    private url: string,
    private apiKey: string,
  ) {}

  /**
   * Returns timestamp of the latest review in the given deck.
   *
   * @param deckName
   * @return ISO 8601 timestamp or null if deck was not found
   */
  async getLatestReviewTimestamp(deckName: string): Promise<string | null> {
    const result = await this.doFetch<number>("getLatestReviewID", {
      deck: deckName,
    });

    if (result === 0) {
      return null; // Deck was not found
    }

    return Temporal.Instant.fromEpochMilliseconds(result).toString();
  }

  /**
   * Fetches all existing decks.
   *
   * @return array of deck names
   */
  async getAllDecks(): Promise<string[]> {
    return this.doFetch<string[]>("deckNames");
  }

  /**
   * Returns all cards for the given deck.
   *
   * @param deckName
   */
  async getAllCards(deckName: string): Promise<AnkiCard[]> {
    return this.findCards(`deck:${deckName}`);
  }

  /**
   * Finds card ids matching the given query.
   *
   * A faster alternative to {@link findCards} when only ids are sufficient.
   *
   * @param query Anki search query
   * @see https://docs.ankiweb.net/searching.html
   */
  async findCardIds(query: string): Promise<number[]> {
    return this.doFetch<number[]>("findCards", {
      query,
    });
  }

  /**
   * Finds cards matching the given query.
   *
   * @param query Anki search query
   * @see findCardIds
   * @see https://docs.ankiweb.net/searching.html
   */
  async findCards(query: string): Promise<AnkiCard[]> {
    const cardIds = await this.findCardIds(query);

    if (cardIds.length === 0) {
      return [];
    }

    return this.getCards(cardIds);
  }

  /**
   * Fetches cards matching the given ids.
   *
   * @param cardIds cards to fetch
   */
  async getCards(cardIds: number[]): Promise<AnkiCard[]> {
    const result = await this.doFetch<AnkiInternalCard[]>("cardsInfo", {
      cards: cardIds,
    });

    return result.map(fromInternalCard);
  }

  /**
   * Fetches card notes matching the given ids.
   *
   * @param noteIds notes to fetch
   */
  async getNotes(noteIds: number[]): Promise<AnkiNote[]> {
    return this.doFetch<AnkiNote[]>("notesInfo", {
      notes: noteIds,
    });
  }

  /**
   * Fetches all reviews of the given deck after the given timestamp.
   *
   * @param deckName
   * @param start latest ISO 8601 timestamp not included in the result
   */
  async getReviews(deckName: string, start: string): Promise<AnkiCardReview[]> {
    const result = await this.doFetch<AnkiCardReviewTuple[]>("cardReviews", {
      deck: deckName,
      startID: Temporal.Instant.from(start).epochMilliseconds,
    });

    return result.map(fromTuple);
  }

  /**
   * Imports a file in .apkg format into the collection.
   *
   * @param path relative to Anki's collection media folder, not to the client
   * @return true if successful or false otherwise
   */
  async importPackage(path: string): Promise<boolean> {
    return this.doFetch<boolean>("importPackage", { path });
  }

  /**
   * Exports the given deck in .apkg format.
   *
   * @param deckName
   * @param path relative to Anki's collection media folder, not to the client
   * @return true if successful or false otherwise
   */
  async exportPackage(deckName: string, path: string): Promise<boolean> {
    return this.doFetch<boolean>("exportPackage", { deck: deckName, path });
  }

  /**
   * Deletes the given decks and all cards in them.
   *
   * @param deckNames
   */
  async deleteDecks(deckNames: string[]): Promise<void> {
    await this.doFetch<null>("deleteDecks", {
      decks: deckNames,
      cardsToo: true,
    });
  }

  private createRequest(
    action: AnkiAction,
    params?: Record<string, unknown>,
  ): AnkiRequest {
    return {
      action,
      version: 6,
      key: this.apiKey,
      params,
    };
  }

  private async doFetch<T>(
    action: AnkiAction,
    params?: Record<string, unknown>,
  ): Promise<T> {
    const ankiRequest = this.createRequest(action, params);
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(ankiRequest),
    });

    if (response.status !== 200) {
      throw new Error("Anki request failed");
    }

    const ankiResponse: AnkiResponse<T> = await response.json();

    if (ankiResponse.error !== null) {
      throw new Error(`Anki request failed: ${ankiResponse.error}`);
    }

    return ankiResponse.result;
  }
}
