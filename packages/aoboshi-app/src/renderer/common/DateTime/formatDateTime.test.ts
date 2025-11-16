import { expect, test } from "vitest";
import { formatDateTime } from "~common/DateTime/formatDateTime";

test("formatDateTime", () => {
  expect(
    formatDateTime("2025-11-16T11:59:20.000Z", {
      locale: "ja",
      timeZone: "Asia/Tokyo",
    }),
  ).toBe("2025年11月16日 20:59:20");
});
