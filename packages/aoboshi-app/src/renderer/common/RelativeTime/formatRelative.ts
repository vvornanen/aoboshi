import { Temporal } from "@js-temporal/polyfill";

const units = [
  "years",
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
] as const;

export type FormatRelativeOptions = {
  locale: string;
  baseDate?: string;
};

export const formatRelative = (
  dateParam: string,
  options: FormatRelativeOptions,
) => {
  const date = Temporal.Instant.from(dateParam);
  const baseDate = options.baseDate
    ? Temporal.Instant.from(options.baseDate)
    : Temporal.Now.instant();
  const duration = date.since(baseDate).round({
    largestUnit: "years",
    smallestUnit: "seconds",
    relativeTo: baseDate.toZonedDateTimeISO(Temporal.Now.timeZoneId()),
    roundingMode: "trunc",
  });

  const formatter = new Intl.RelativeTimeFormat(options.locale, {
    numeric: "auto",
    style: "long",
  });

  const unit = units.find((unit) => duration[unit] !== 0) ?? "seconds";

  return formatter.format(duration[unit], unit);
};
