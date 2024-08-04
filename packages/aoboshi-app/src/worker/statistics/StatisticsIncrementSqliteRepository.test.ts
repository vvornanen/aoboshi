import fs from "node:fs";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import { afterEach, beforeAll, beforeEach, expect, test } from "vitest";
import {
  StatisticsIncrement,
  StatisticsIncrementRepository,
} from "@vvornanen/aoboshi-core/statistics";
import { StatisticsIncrementSqliteRepository } from "~/worker/statistics/StatisticsIncrementSqliteRepository";

const fixture: StatisticsIncrement[] = [
  {
    id: "6ffjCytJrZC9ozOhLad29q",
    start: null,
    end: "2024-08-04T12:14:08Z",
    numberOfReviews: 14,
    numberOfNewCards: 20,
    duration: 204,
  },
  {
    id: "6vTLmymkQoDYgLvcwggv9I",
    start: "2024-08-04T12:14:08Z",
    end: "2024-08-04T12:16:42Z",
    numberOfReviews: 2,
    numberOfNewCards: 20,
    duration: 187,
  },
];

let database: BetterSqlite3.Database;
let repository: StatisticsIncrementRepository;

beforeAll(async () => {
  database = new BetterSqlite3(":memory:");
  database.exec(
    fs
      .readFileSync(path.join(__dirname, "../../migrations/schema.sql"))
      .toString(),
  );
  repository = new StatisticsIncrementSqliteRepository(database);
});

beforeEach(() => {
  repository.saveAll(fixture);
});

afterEach(() => {
  repository.deleteAll();
});

test("save inserts new row", () => {
  const expected: StatisticsIncrement = {
    id: "4dDKHHO3E0B0Aug1oYtfx6",
    start: "2024-08-04T12:16:42Z",
    end: "2024-08-05T18:20:00Z",
    numberOfReviews: 35,
    numberOfNewCards: 0,
    duration: 322,
  };
  repository.save(expected);

  const actual = repository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("save updates existing row", () => {
  const expected: StatisticsIncrement = {
    id: fixture[1].id,
    start: "2024-09-01T00:00:00Z",
    end: "2024-09-02T00:00:00Z",
    numberOfReviews: 300,
    numberOfNewCards: 4,
    duration: 1023,
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
  { id: "6JMP9NRnijPO7l1dutQu7k", expected: false },
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

test("findLatest", () => {
  expect(repository.findLatest()).toEqual(fixture[1]);
});
