// Only implemented actions are listed here
export type AnkiAction =
  | "getLatestReviewID"
  | "deckNames"
  | "findCards"
  | "cardsInfo"
  | "notesInfo"
  | "cardReviews"
  | "importPackage"
  | "exportPackage"
  | "deleteDecks";

/**
 * AnkiConnect request
 *
 * @see https://foosoft.net/projects/anki-connect/
 */
export interface AnkiRequest {
  action: AnkiAction;
  version: 6;
  key: string;
  params: Record<string, unknown>;
}
