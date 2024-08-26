import fs from "node:fs";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import { afterEach, beforeAll, beforeEach, expect, test } from "vitest";
import {
  StatisticsByCharacter,
  StatisticsByCharacterRepository,
} from "@vvornanen/aoboshi-core/statistics/character";
import * as fixtures from "@vvornanen/aoboshi-core/statisticsFixtures";
import { StatisticsByCharacterSqliteRepository } from "~/worker/statistics";

const fixture: StatisticsByCharacter[] =
  fixtures.multipleReviews.statisticsByCharacters;

let database: BetterSqlite3.Database;
let repository: StatisticsByCharacterRepository;

beforeAll(async () => {
  database = new BetterSqlite3(":memory:");
  database.exec(
    fs
      .readFileSync(path.join(__dirname, "../../migrations/schema.sql"))
      .toString(),
  );
  repository = new StatisticsByCharacterSqliteRepository(database);
});

beforeEach(() => {
  repository.saveAll(fixture);
});

afterEach(() => {
  repository.deleteAll();
});

test("save inserts new row", () => {
  const expected: StatisticsByCharacter = {
    id: "1rLmlTR116WMatAO8WmB6C",
    literal: "考",
    firstAdded: "2024-08-01",
    firstReviewed: "2024-08-02",
    lastReviewed: "2024-08-05",
    numberOfReviews: 5,
    numberOfCards: 1,
  };
  repository.save(expected);

  const actual = repository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("save updates existing row", () => {
  const expected: StatisticsByCharacter = {
    id: fixture[0].id,
    literal: "学",
    firstAdded: "2016-01-12",
    firstReviewed: "2016-01-13",
    lastReviewed: "2024-08-05",
    numberOfReviews: 20,
    numberOfCards: 15,
  };

  repository.save(expected);

  const actual = repository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("find all", () => {
  expect(repository.findAll()).toEqual(fixture);
});

test("count", () => {
  expect(repository.count()).toEqual(3);
});

test.each([
  { id: fixture[0].id, expected: true },
  { id: "4CnGSylWx0wY0ma2Ojrynl", expected: false },
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

test("findByLiteral", () => {
  expect(repository.findByLiteral("大")).toEqual(fixture[1]);
});
