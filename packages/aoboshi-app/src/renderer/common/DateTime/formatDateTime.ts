import { Temporal } from "@js-temporal/polyfill";

export type FormatDateTimeOptions = {
  locale: string;
  /** If undefined, uses system's timezone */
  timeZone?: string;
};

export const formatDateTime = (
  value: string,
  options: FormatDateTimeOptions,
) => {
  const date = Temporal.Instant.from(value);

  const formatter = new Intl.DateTimeFormat(options.locale, {
    dateStyle: "long",
    timeStyle: "medium",
    timeZone: options.timeZone,
  });

  return formatter.format(date.epochMilliseconds);
};
