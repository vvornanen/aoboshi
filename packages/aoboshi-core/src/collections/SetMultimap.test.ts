import { afterEach, expect, test } from "vitest";
import { Multimap, SetMultimap } from ".";

let multimap: Multimap<string, number> = new SetMultimap();

afterEach(() => {
  multimap = new SetMultimap();
});

test("add returns true if value not already present", () => {
  expect(multimap.add("foo", 1)).toBeTruthy();
});

test("add returns false if value was already present", () => {
  multimap.add("foo", 1);
  expect(multimap.add("foo", 1)).toBeFalsy();
});

test("get returns an empty array if key is not present", () => {
  expect(multimap.get("foo")).toHaveLength(0);
});

test("get returns all values", () => {
  multimap.add("foo", 1);
  multimap.add("foo", 2);
  expect(multimap.get("foo")).toEqual([1, 2]);
});

test("get returns only unique values", () => {
  multimap.add("foo", 1);
  multimap.add("foo", 2);
  multimap.add("foo", 1);
  expect(multimap.get("foo")).toEqual([1, 2]);
});
