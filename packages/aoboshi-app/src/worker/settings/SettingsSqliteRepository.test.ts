import fs from "node:fs";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import { afterEach, beforeAll, expect, test } from "vitest";
import {
  AppSettings,
  SettingsRepository,
  SettingsSqliteRepository,
} from "~/worker/settings";

let database: BetterSqlite3.Database;
let settingsRepository: SettingsRepository;

beforeAll(async () => {
  database = new BetterSqlite3(":memory:");
  database.exec(
    fs
      .readFileSync(path.join(__dirname, "../../migrations/schema.sql"))
      .toString(),
  );
  settingsRepository = new SettingsSqliteRepository(database);
});

afterEach(() => {
  settingsRepository.deleteAll();
});

test("save inserts new row", () => {
  const expected = {
    timeZoneConfig: [{ timeZone: "UTC" }],
  } satisfies AppSettings;
  settingsRepository.save(expected);
  const actual = settingsRepository.find();
  expect(actual).toEqual(expected);
});

test("save updates existing row", () => {
  settingsRepository.save({ timeZoneConfig: [{ timeZone: "UTC" }] });

  const expected = {
    timeZoneConfig: [
      { timeZone: "UTC", validFrom: "2024-01-01T00:00:00.000Z" },
    ],
    anki: {
      url: "http://localhost:8000",
      apiKey: "test",
      deckName: "test",
    },
  } satisfies AppSettings;

  settingsRepository.save(expected);
  const actual = settingsRepository.find();
  expect(actual).toEqual(expected);
});
