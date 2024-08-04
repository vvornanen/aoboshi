import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { KanjidicReader } from "./KanjidicReader";

const fixture = fs
  .readFileSync(path.join(__dirname, "kanjidicFixture.xml"))
  .toString();

test("get characters", () => {
  const kanjidicReader = new KanjidicReader();
  const actual = kanjidicReader.getCharacters(fixture);

  const expected = [
    {
      literal: "字",
      radical: null,
      grade: 1,
      references: [],
      strokeCount: 6,
      onyomi: ["ジ"],
      kunyomi: ["あざ", "あざな", "-な"],
    },
    {
      literal: "学",
      radical: null,
      grade: 1,
      references: [],
      strokeCount: 8,
      onyomi: ["ガク"],
      kunyomi: ["まな.ぶ"],
    },
    {
      literal: "碵",
      radical: null,
      grade: null,
      references: [],
      strokeCount: 14,
      onyomi: [],
      kunyomi: [],
    },
    {
      literal: "穃",
      radical: null,
      grade: null,
      references: [],
      strokeCount: 15,
      onyomi: ["ヨウ"],
      kunyomi: [],
    },
    {
      literal: "𠂉",
      radical: null,
      grade: null,
      references: [],
      strokeCount: 2,
      onyomi: [],
      kunyomi: [],
    },
    {
      literal: "逢",
      radical: null,
      grade: 9,
      references: [],
      strokeCount: 10,
      onyomi: ["ホウ"],
      kunyomi: ["あ.う", "むか.える"],
    },
  ];

  expect(actual).toEqual(expected);
});
