import { AnkiCardField } from "./AnkiCard";

export type AnkiNote = {
  noteId: number;
  tags: string[];
  fields: Record<string, AnkiCardField>;
  modelName: string;
  cards: number[];
};
