/**
 * AnkiConnect response
 *
 * @see https://foosoft.net/projects/anki-connect/
 */
export interface AnkiResponse<T> {
  result: T;
  error: string | null;
}
