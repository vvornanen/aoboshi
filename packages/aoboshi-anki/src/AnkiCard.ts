export type AnkiCardField = {
  value: string;
  order: number;
};

export type AnkiCard = {
  cardId: number;
  fields: Record<string, AnkiCardField>;
  fieldOrder: number;
  question: string;
  answer: string;
  modelName: string;
  ord: number;
  deckName: string;
  css: string;
  factor: number;
  interval: number;
  note: number;
  type: number;
  queue: number;
  due: number;
  reps: number;
  lapses: number;
  left: number;
  mod: number;
};
