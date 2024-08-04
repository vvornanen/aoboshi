import fs from "node:fs";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import {
  Character,
  getCodePoint,
  Grade,
  CharacterRepository,
} from "@vvornanen/aoboshi-core/characters";
import { beforeAll, test, expect, afterEach, beforeEach } from "vitest";
import { CharacterSqliteRepository } from "./CharacterSqliteRepository";

const fixture: Character[] = [
  {
    literal: "あ",
    radical: null,
    grade: null,
    strokeCount: 0,
    references: [],
    onyomi: [],
    kunyomi: [],
  },
  {
    literal: "い",
    radical: null,
    grade: null,
    strokeCount: 0,
    references: [],
    onyomi: [],
    kunyomi: [],
  },
];

let database: BetterSqlite3.Database;
let characterRepository: CharacterRepository;

beforeAll(async () => {
  database = new BetterSqlite3(":memory:");
  database.exec(
    fs
      .readFileSync(path.join(__dirname, "../../migrations/schema.sql"))
      .toString(),
  );
  characterRepository = new CharacterSqliteRepository(database);
});

beforeEach(() => {
  characterRepository.saveAll(fixture);
});

afterEach(() => {
  characterRepository.deleteAll();
});

test("save inserts new row", () => {
  const expected: Character = {
    literal: "学",
    radical: "子",
    grade: Grade.Kyoiku1,
    strokeCount: 8,
    references: [],
    onyomi: ["ガク"],
    kunyomi: ["まな.ぶ"],
    strokes: "<svg/>",
  };
  characterRepository.save(expected);

  const actual = characterRepository.findByLiteral(expected.literal);

  expect(actual).toEqual(expected);
});

test("save updates existing row", () => {
  characterRepository.save({
    literal: "学",
    radical: null,
    grade: null,
    strokeCount: 0,
    references: [],
    onyomi: [],
    kunyomi: [],
  });

  const expected: Character = {
    literal: "学",
    radical: "子",
    grade: Grade.Kyoiku1,
    strokeCount: 8,
    references: [],
    onyomi: ["ガク"],
    kunyomi: ["まな.ぶ"],
    strokes: "<svg/>",
  };

  characterRepository.save(expected);

  const actual = characterRepository.findByLiteral(expected.literal);

  expect(actual).toEqual(expected);
});

test("find all", () => {
  expect(characterRepository.findAll()).toEqual(fixture);
});

test("count", () => {
  expect(characterRepository.count()).toEqual(2);
});

test.each([
  { id: getCodePoint("あ"), expected: true },
  { id: getCodePoint("学"), expected: false },
])("existsById %s", ({ id, expected }) => {
  const actual = characterRepository.existsById(id);
  expect(actual).toEqual(expected);
});

test.each([
  { literal: "あ", expected: true },
  { literal: "学", expected: false },
])("existsByLiteral %s", ({ literal, expected }) => {
  const actual = characterRepository.existsByLiteral(literal);
  expect(actual).toEqual(expected);
});

test("deleteById", () => {
  const id = getCodePoint("あ");
  characterRepository.deleteById(id);
  expect(characterRepository.findById(id)).toBeNull();
});

test("deleteByLiteral", () => {
  const literal = "あ";
  characterRepository.deleteByLiteral(literal);
  expect(characterRepository.findByLiteral(literal)).toBeNull();
});

test("delete", () => {
  const literal = "あ";
  const character = characterRepository.findByLiteral("あ");
  expect(character).not.toBeNull();
  characterRepository.delete(character!);
  expect(characterRepository.existsByLiteral(literal)).toBeFalsy();
});

test("delete all", () => {
  characterRepository.deleteAll();
  expect(characterRepository.count()).toEqual(0);
});
