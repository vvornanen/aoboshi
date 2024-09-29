import { expect, test } from "vitest";
import { formatRelative } from "~common/RelativeTime";

test.each([
  { date: "2022-01-01T00:00:00.000Z", expected: "2 年前" },
  { date: "2023-01-01T00:00:00.000Z", expected: "昨年" },
  { date: "2023-02-01T00:00:00.000Z", expected: "11 か月前" },
  { date: "2023-11-01T00:00:00.000Z", expected: "2 か月前" },
  { date: "2023-12-01T00:00:00.000Z", expected: "先月" },
  { date: "2023-12-02T00:00:00.000Z", expected: "30 日前" },
  { date: "2023-12-29T00:00:00.000Z", expected: "3 日前" },
  { date: "2023-12-30T00:00:00.000Z", expected: "一昨日" },
  { date: "2023-12-31T00:00:00.000Z", expected: "昨日" },
  { date: "2023-12-31T23:00:00.000Z", expected: "1 時間前" },
  { date: "2023-12-31T23:58:00.000Z", expected: "2 分前" },
  { date: "2023-12-31T23:59:00.000Z", expected: "1 分前" },
  { date: "2023-12-31T23:59:01.000Z", expected: "59 秒前" },
  { date: "2023-12-31T23:59:58.000Z", expected: "2 秒前" },
  { date: "2023-12-31T23:59:59.000Z", expected: "1 秒前" },
  { date: "2023-12-31T23:59:59.001Z", expected: "今" },
  { date: "2024-01-01T00:00:00.000Z", expected: "今" },
  { date: "2024-01-01T00:00:00.999Z", expected: "今" },
  { date: "2024-01-01T00:00:01.000Z", expected: "1 秒後" },
  { date: "2024-01-01T00:00:02.000Z", expected: "2 秒後" },
  { date: "2024-01-01T00:00:59.000Z", expected: "59 秒後" },
  { date: "2024-01-01T00:01:00.000Z", expected: "1 分後" },
  { date: "2024-01-01T00:01:59.999Z", expected: "1 分後" },
  { date: "2024-01-01T00:02:00.000Z", expected: "2 分後" },
  { date: "2024-01-01T01:00:00.000Z", expected: "1 時間後" },
  { date: "2024-01-02T00:00:00.000Z", expected: "明日" },
  { date: "2024-01-03T00:00:00.000Z", expected: "明後日" },
  { date: "2024-01-04T00:00:00.000Z", expected: "3 日後" },
  { date: "2024-01-31T00:00:00.000Z", expected: "30 日後" },
  { date: "2024-02-01T00:00:00.000Z", expected: "来月" },
  { date: "2024-03-01T00:00:00.000Z", expected: "2 か月後" },
  { date: "2024-12-31T00:00:00.000Z", expected: "11 か月後" },
  { date: "2025-01-01T00:00:00.000Z", expected: "来年" },
  { date: "2026-01-01T00:00:00.000Z", expected: "2 年後" },
])("formatRelative %s", ({ date, expected }) => {
  const actual = formatRelative(date, {
    baseDate: "2024-01-01T00:00:00.000Z",
    locale: "ja",
  });
  expect(actual).toBe(expected);
});
