import { AnkiCard } from "./AnkiCard";
import { AnkiNote } from "./AnkiNote";

export const card1: AnkiCard = {
  cardId: 1684434203213,
  fields: {
    Expression: {
      value: "expression 1",
      order: 0,
    },
    Meaning: {
      value: "meaning 1",
      order: 1,
    },
    Reading: {
      value: "reading 1",
      order: 2,
    },
  },
  fieldOrder: 0,
  question: "<div>question 1</div>",
  answer: "<div>answer 1</div>",
  modelName: "Japanese",
  ord: 0,
  deckName: "test",
  css: ".card {}",
  factor: 1750,
  interval: 935,
  note: 1684434396302,
  type: 2,
  queue: 2,
  due: 3174,
  reps: 13,
  lapses: 0,
  left: 0,
  mod: 1646156864,
};

export const card2: AnkiCard = {
  cardId: 1684434214608,
  fields: {
    Expression: {
      value: "expression 2",
      order: 0,
    },
    Meaning: {
      value: "meaning 2",
      order: 1,
    },
    Reading: {
      value: "reading 2",
      order: 2,
    },
  },
  fieldOrder: 0,
  question: "<div>question 2</div>",
  answer: "<div>answer 2</div>",
  modelName: "Japanese",
  ord: 0,
  deckName: "test",
  css: ".card {}",
  factor: 1750,
  interval: 935,
  note: 1684435554147,
  type: 2,
  queue: 2,
  due: 3174,
  reps: 13,
  lapses: 0,
  left: 0,
  mod: 1646156864,
};

export const note1: AnkiNote = {
  noteId: card1.note,
  tags: [],
  fields: card1.fields,
  modelName: "Japanese",
  cards: [card1.cardId],
};

export const note2: AnkiNote = {
  noteId: card2.note,
  tags: [],
  fields: card2.fields,
  modelName: "Japanese",
  cards: [card2.cardId],
};
