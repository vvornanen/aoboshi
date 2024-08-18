import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { TTLSetMultimap } from "~/collections";

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

test("zero ttl", () => {
  vi.setSystemTime("2024-08-18T12:00:00.000Z");
  const multimap = new TTLSetMultimap<string, number>(0);
  expect(multimap.isExpired()).toBe(true);
});

test("is expired", () => {
  vi.setSystemTime("2024-08-18T12:00:00.000Z");
  const multimap = new TTLSetMultimap<string, number>(
    Temporal.Duration.from({ minutes: 5 }),
  );
  vi.setSystemTime("2024-08-18T12:05:00.000Z");
  expect(multimap.isExpired()).toBe(true);
});

test("is not expired", () => {
  vi.setSystemTime("2024-08-18T12:00:00.000Z");
  const multimap = new TTLSetMultimap<string, number>(
    Temporal.Duration.from({ minutes: 5 }),
  );
  vi.setSystemTime("2024-08-18T12:04:59.999Z");
  expect(multimap.isExpired()).toBe(false);
});
