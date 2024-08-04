import fs from "node:fs";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import { afterEach, beforeAll, beforeEach, expect, test } from "vitest";
import {
  StatisticsByChapter,
  StatisticsByChapterRepository,
} from "@vvornanen/aoboshi-core/statistics/chapter";
import { BookRepository } from "@vvornanen/aoboshi-core/books";
import { StatisticsByChapterSqliteRepository } from "~/worker/statistics/StatisticsByChapterSqliteRepository";
import { BookSqliteRepository } from "~/worker/books";

const fixture: StatisticsByChapter[] = [
  {
    id: "45YsAL0andFTWVyOXGDTO4",
    bookId: "7MQJV7VmMldnis5JsIvRYP",
    chapterId: "2btJ2gVbrG43PPupt6OSfj",
    seenCharacters: "一右",
    newCharacters: "雨円王",
    unseenCharacters: "音下火花貝",
    numberOfSeenCharacters: 2,
    numberOfNewCharacters: 3,
    numberOfUnseenCharacters: 5,
    totalNumberOfCharacters: 10,
  },
  {
    id: "4oisAj5fi9JXZ3oeJYtXll",
    bookId: "7MQJV7VmMldnis5JsIvRYP",
    chapterId: "6YocudGxNRXtFOBSOUTOCD",
    seenCharacters: "",
    newCharacters: "学気九休玉",
    unseenCharacters: "金空月犬見五口",
    numberOfSeenCharacters: 0,
    numberOfNewCharacters: 5,
    numberOfUnseenCharacters: 7,
    totalNumberOfCharacters: 12,
  },
];

let database: BetterSqlite3.Database;
let repository: StatisticsByChapterRepository;
let bookRepository: BookRepository;

beforeAll(async () => {
  database = new BetterSqlite3(":memory:");
  database.exec(
    fs
      .readFileSync(path.join(__dirname, "../../migrations/schema.sql"))
      .toString(),
  );
  repository = new StatisticsByChapterSqliteRepository(database);
  bookRepository = new BookSqliteRepository(database);
});

beforeEach(() => {
  bookRepository.save({
    id: "7MQJV7VmMldnis5JsIvRYP",
    title: "test",
    titleShort: "test",
    volumes: [],
  });
  repository.saveAll(fixture);
});

afterEach(() => {
  repository.deleteAll();
});

test("save inserts new row", () => {
  const expected: StatisticsByChapter = {
    id: "4SfTlRbNsBb0YzR0wtf9Ir",
    bookId: "7MQJV7VmMldnis5JsIvRYP",
    chapterId: "0GYLYKviN2ooMgS2TTIYJd",
    seenCharacters: "校",
    newCharacters: "",
    unseenCharacters: "左三山子四糸字耳七",
    numberOfSeenCharacters: 1,
    numberOfNewCharacters: 0,
    numberOfUnseenCharacters: 9,
    totalNumberOfCharacters: 10,
  };
  repository.save(expected);

  const actual = repository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("save updates existing row", () => {
  const expected: StatisticsByChapter = {
    id: fixture[1].id,
    bookId: "7MQJV7VmMldnis5JsIvRYP",
    chapterId: "6YocudGxNRXtFOBSOUTOCD",
    seenCharacters: "学金",
    newCharacters: "気九休玉",
    unseenCharacters: "空月犬見五",
    numberOfSeenCharacters: 2,
    numberOfNewCharacters: 4,
    numberOfUnseenCharacters: 5,
    totalNumberOfCharacters: 11,
  };

  repository.save(expected);

  const actual = repository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("find all", () => {
  expect(repository.findAll()).toEqual(fixture);
});

test("count", () => {
  expect(repository.count()).toEqual(2);
});

test.each([
  { id: fixture[0].id, expected: true },
  { id: "788t52opHd8My47HFcI3Gq", expected: false },
])("existsById %s", ({ id, expected }) => {
  const actual = repository.existsById(id);
  expect(actual).toEqual(expected);
});

test("deleteById", () => {
  const id = fixture[0].id;
  repository.deleteById(id);
  expect(repository.findById(id)).toBeNull();
});

test("delete", () => {
  const id = fixture[0].id;
  const increment = repository.findById(id);
  expect(increment).not.toBeNull();
  repository.delete(increment!);
  expect(repository.existsById(id)).toBeFalsy();
});

test("delete all", () => {
  repository.deleteAll();
  expect(repository.count()).toEqual(0);
});

test("findByChapter", () => {
  expect(repository.findByChapter("6YocudGxNRXtFOBSOUTOCD")).toEqual(
    fixture[1],
  );
});
