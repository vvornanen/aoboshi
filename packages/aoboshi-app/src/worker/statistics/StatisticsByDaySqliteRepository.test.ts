import fs from "node:fs";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import { afterEach, beforeAll, beforeEach, expect, test } from "vitest";
import {
  StatisticsByDay,
  StatisticsByDayRepository,
} from "@vvornanen/aoboshi-core/statistics/day";
import { StatisticsByDaySqliteRepository } from "~/worker/statistics/StatisticsByDaySqliteRepository";

const fixture: StatisticsByDay[] = [
  {
    id: "5itoprCjhPciumpXSrFIms",
    date: "2016-01-12",
    addedCharacters: "学",
    firstSeenCharacters: "",
    reviewedCharacters: "",
    numberOfAddedCharacters: 1,
    numberOfFirstSeenCharacters: 0,
    numberOfReviewedCharacters: 0,
    numberOfReviews: 0,
  },
  {
    id: "6TtIZjKGxWkJdS1cwOgFA2",
    date: "2016-01-13",
    addedCharacters: "",
    firstSeenCharacters: "学",
    reviewedCharacters: "学",
    numberOfAddedCharacters: 0,
    numberOfFirstSeenCharacters: 1,
    numberOfReviewedCharacters: 1,
    numberOfReviews: 1,
  },
];

let database: BetterSqlite3.Database;
let repository: StatisticsByDayRepository;

beforeAll(async () => {
  database = new BetterSqlite3(":memory:");
  database.exec(
    fs
      .readFileSync(path.join(__dirname, "../../migrations/schema.sql"))
      .toString(),
  );
  repository = new StatisticsByDaySqliteRepository(database);
});

beforeEach(() => {
  repository.saveAll(fixture);
});

afterEach(() => {
  repository.deleteAll();
});

test("save inserts new row", () => {
  const expected: StatisticsByDay = {
    id: "5bPEbqxswA9WbcRSWxGNPn",
    date: "2016-01-14",
    addedCharacters: "",
    firstSeenCharacters: "学大日",
    reviewedCharacters: "学大日",
    numberOfAddedCharacters: 0,
    numberOfFirstSeenCharacters: 3,
    numberOfReviewedCharacters: 3,
    numberOfReviews: 3,
  };
  repository.save(expected);

  const actual = repository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("save updates existing row", () => {
  const expected: StatisticsByDay = {
    id: fixture[1].id,
    date: "2016-01-13",
    addedCharacters: "日",
    firstSeenCharacters: "学日",
    reviewedCharacters: "学日",
    numberOfAddedCharacters: 1,
    numberOfFirstSeenCharacters: 2,
    numberOfReviewedCharacters: 2,
    numberOfReviews: 3,
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
  { id: "0ZgTfL4SbwrysFKWlPNM8N", expected: false },
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

test("findByDate", () => {
  expect(repository.findByDate("2016-01-13")).toEqual(fixture[1]);
});
