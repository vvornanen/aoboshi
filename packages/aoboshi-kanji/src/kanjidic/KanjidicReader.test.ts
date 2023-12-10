import fs from "node:fs";
import path from "node:path";
import { test, expect } from "vitest";
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
  ];

  expect(actual).toEqual(expected);
});
