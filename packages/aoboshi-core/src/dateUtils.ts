import { Temporal } from "@js-temporal/polyfill";

/**
 * Returns the earliest of the given dates.
 *
 * @param values PlainDate objects or ISO 8601 date strings
 */
export const minDate = (
  ...values: (string | Temporal.PlainDate)[]
): Temporal.PlainDate => {
  if (values.length === 0) {
    throw new Error("Expected at least one date as argument");
  }

  let min = Temporal.PlainDate.from(values[0]);

  for (const value of values) {
    const date = Temporal.PlainDate.from(value);
    if (!min || Temporal.PlainDate.compare(min, date) > 0) {
      min = date;
    }
  }

  return min;
};

/**
 * Returns the earliest of the given dates.
 *
 * Ignores all falsy values.
 *
 * @param values nullable PlainDate objects or ISO 8601 date strings
 * @return undefined if all given values are null or undefined
 */
export const nullableMinDate = (
  ...values: (string | Temporal.PlainDate | undefined | null)[]
): Temporal.PlainDate | undefined => {
  const nonEmptyValues = values.filter(nonEmpty);

  if (nonEmptyValues.length === 0) {
    return undefined;
  }

  return minDate(...nonEmptyValues);
};

/**
 * Returns the latest of the given dates.
 *
 * @param values PlainDate objects or ISO 8601 date strings
 */
export const maxDate = (...values: (string | Temporal.PlainDate)[]) => {
  if (values.length === 0) {
    throw new Error("Expected at least one date as argument");
  }

  let max = Temporal.PlainDate.from(values[0]);

  for (const value of values) {
    const date = Temporal.PlainDate.from(value);
    if (!max || Temporal.PlainDate.compare(max, date) < 0) {
      max = date;
    }
  }

  return max;
};

/**
 * Returns the latest of the given dates.
 *
 * Ignores all falsy values.
 *
 * @param values nullable PlainDate objects or ISO 8601 date strings
 * @return undefined if all given values are null or undefined
 */
export const nullableMaxDate = (
  ...values: (string | Temporal.PlainDate | undefined | null)[]
): Temporal.PlainDate | undefined => {
  const nonEmptyValues = values.filter(nonEmpty);

  if (nonEmptyValues.length === 0) {
    return undefined;
  }

  return maxDate(...nonEmptyValues);
};

const nonEmpty = <T>(value: T | undefined | null): value is T => !!value;
