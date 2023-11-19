/**
 * Calculates a numeric hash for the given string
 *
 * @param value
 * @param max if defined, returns a number between 0 and max (exclusive)
 */
export const hash = (value: string, max?: number): number => {
  const hash = Math.abs(
    Array.from(value)
      .map((c) => c.charCodeAt(0))
      .reduce((acc, c) => (acc * 31 + c) | 0, 0),
  );

  return max ? hash % max : hash;
};
