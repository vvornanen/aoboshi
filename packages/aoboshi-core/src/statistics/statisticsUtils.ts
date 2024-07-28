import { Temporal } from "@js-temporal/polyfill";
import { KANJI_REGEXP } from "../characters/Character";

/** Specifies a time zone valid in the given period */
export type TimeZoneConfig = {
  /** ISO 8601 datetime string */
  validFrom?: string;

  /** ISO 8601 datetime string */
  validTo?: string;

  /** ISO 8601 time zone identifier */
  timeZone: string;
};

/**
 * Resolves the time zone of a timestamp using time zones with validity periods.
 *
 * This resolves the correct time zone where the given timestamp was recorded
 * when all timestamps are in UTC.
 *
 * @param instant the timestamp to resolve
 * @param timeZoneConfigs defines time zones for specific time periods
 */
export const getTimeZone = (
  instant: Temporal.Instant | string,
  timeZoneConfigs: TimeZoneConfig[],
) => {
  const timeZoneConfig = timeZoneConfigs.find((timeZone) => {
    const validFrom =
      timeZone.validFrom && Temporal.Instant.from(timeZone.validFrom);
    const validTo = timeZone.validTo && Temporal.Instant.from(timeZone.validTo);
    return (
      (!validFrom || Temporal.Instant.compare(validFrom, instant) <= 0) &&
      (!validTo || Temporal.Instant.compare(validTo, instant) >= 0)
    );
  });
  return timeZoneConfig
    ? Temporal.TimeZone.from(timeZoneConfig.timeZone)
    : Temporal.TimeZone.from("UTC");
};

/**
 * Resolves the local date of a timestamp using time zones with validity periods.
 *
 * This resolves the correct local date for a timestamp when reviews were done
 * on multiple time zones and all timestamps are in UTC.
 *
 * @param timestamp
 * @param timeZoneConfigs defines time zones for specific time periods
 */
export const timestampToDate = (
  timestamp: Temporal.Instant | string,
  timeZoneConfigs: TimeZoneConfig[],
): Temporal.PlainDate => {
  const instant = Temporal.Instant.from(timestamp);
  const timeZone = getTimeZone(instant, timeZoneConfigs);
  return instant.toZonedDateTimeISO(timeZone).toPlainDate();
};

/**
 * Returns all unique kanji characters from the given string.
 *
 * @param expression a Japanese word or a phrase
 */
export const getCharactersFromExpression = (expression: string): string[] => {
  const uniqueCharacters = new Set<string>();

  [...expression]
    .filter((literal) => literal.match(KANJI_REGEXP))
    .forEach((literal) => uniqueCharacters.add(literal));

  return Array.from(uniqueCharacters);
};
