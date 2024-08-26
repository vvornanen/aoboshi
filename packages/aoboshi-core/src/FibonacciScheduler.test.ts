import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
  vi,
} from "vitest";
import { FibonacciScheduler } from "~/FibonacciScheduler";

const callback = vi.fn();
let scheduler: FibonacciScheduler;

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

beforeEach(() => {
  scheduler = new FibonacciScheduler(callback);
});

afterEach(() => {
  vi.resetAllMocks();
});

test("reset", () => {
  scheduler.reset();
  expect(scheduler.getInterval()).toBe(0);
});

test.each([
  { n: 0, expected: 0 },
  { n: 1, expected: 1000 },
  { n: 2, expected: 1000 },
  { n: 3, expected: 2000 },
  { n: 4, expected: 3000 },
  { n: 5, expected: 5000 },
  { n: 6, expected: 8000 },
  { n: 7, expected: 13000 },
  { n: 8, expected: 21000 },
])("increase %s", ({ n, expected }) => {
  Array.from({ length: n }).forEach(() => scheduler.increase());
  expect(scheduler.getInterval()).toBe(expected);
});

test("interval < max interval", () => {
  scheduler.setMaxInterval(10000);
  Array.from({ length: 6 }).forEach(() => scheduler.increase());
  expect(scheduler.getInterval()).toBe(8000);
});

test("interval capped at max interval", () => {
  scheduler.setMaxInterval(10000);
  Array.from({ length: 7 }).forEach(() => scheduler.increase());
  expect(scheduler.getInterval()).toBe(10000);
});

test("start", async () => {
  scheduler.start();
  vi.advanceTimersToNextTimer();
  await vi.waitUntil(() => callback.mock.calls.length >= 1);
  vi.advanceTimersToNextTimer();
  scheduler.stop();
  expect(callback).toHaveBeenCalledTimes(2);
});
