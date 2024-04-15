import { getRandomValues } from "crypto";
import { vi, test, expect } from "vitest";
import { randomId } from "./randomId";

vi.mock("crypto", () => {
  return {
    getRandomValues: vi.fn(),
  };
});

const mockGetRandomValues = (randomValues: bigint[]) => {
  if (vi.isMockFunction(getRandomValues)) {
    getRandomValues.mockImplementationOnce((buffer: bigint[]) => {
      randomValues.forEach(
        (randomValue, index) => (buffer[index] = randomValue),
      );
    });
  }
};

test.each([
  {
    randomValues: [0n, 0n],
    expected: "0000000000000000000000",
  },
  {
    randomValues: [1n, 0n],
    expected: "0000000000000000000001",
  },
  {
    randomValues: [0n, 1n],
    expected: "00000000000LygHa16AHYG",
  },
  {
    randomValues: [1n, 1n],
    expected: "00000000000LygHa16AHYH",
  },
  {
    randomValues: [16723309294332875777n, 1532900013374224946n],
    expected: "0e8o7BQTpqI0p9DmbfyJ8r",
  },
  {
    randomValues: [7040429598940542180n, 5943526278447920246n],
    expected: "2VdsPsU40oufw7jZL4Otam",
  },
])("randomId %s", ({ randomValues, expected }) => {
  mockGetRandomValues(randomValues);
  expect(randomId()).toEqual(expected);
});
