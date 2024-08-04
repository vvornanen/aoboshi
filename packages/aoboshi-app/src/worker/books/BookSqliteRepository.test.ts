import fs from "node:fs";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import { afterEach, beforeAll, beforeEach, expect, test } from "vitest";
import { Book, BookRepository } from "@vvornanen/aoboshi-core/books";
import { BookSqliteRepository } from "./BookSqliteRepository";

const fixtures: Book[] = [
  {
    id: "9PHkaan3kC5Ug72f2uTaO8",
    title: "Test book title",
    titleShort: "Test",
    volumes: [
      {
        id: "4Ao2KhHlfoHQ979PEaYUca",
        title: "Volume 1",
        chapters: [
          {
            id: "6GwdXDnfW5iUxjC7RF6gkK",
            title: "Chapter 1",
            code: "C1",
            subtitle: "Subtitle",
            characters: "字",
          },
        ],
      },
    ],
  },
];

let database: BetterSqlite3.Database;
let bookRepository: BookRepository;

beforeAll(async () => {
  database = new BetterSqlite3(":memory:");
  database.exec(
    fs
      .readFileSync(path.join(__dirname, "../../migrations/schema.sql"))
      .toString(),
  );
  bookRepository = new BookSqliteRepository(database);
});

beforeEach(() => {
  bookRepository.saveAll(fixtures);
});

afterEach(() => {
  bookRepository.deleteAll();
});

test("save inserts new row", () => {
  const expected: Book = {
    id: "7C9dQLN5oYHaVYzkefq4jQ",
    title: "A new book title",
    titleShort: "New book",
    volumes: [],
  };

  bookRepository.save(expected);

  const actual = bookRepository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("save updates existing row", () => {
  const expected: Book = {
    ...fixtures[0],
    title: "Updated title",
    titleShort: "Updated short",
    volumes: [
      ...fixtures[0].volumes,
      { id: "7RmCwuT87nXExrcszo3Z2G", title: "Volume 2", chapters: [] },
    ],
  };
  bookRepository.save(expected);

  const actual = bookRepository.findById(expected.id);

  expect(actual).toEqual(expected);
});

test("find all", () => {
  expect(bookRepository.findAll()).toEqual(fixtures);
});
