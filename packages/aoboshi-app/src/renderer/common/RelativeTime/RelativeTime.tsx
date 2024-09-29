import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { FormatRelativeOptions, formatRelative } from "~common/RelativeTime";

type RelativeTimeProps = ComponentPropsWithoutRef<"time"> &
  Omit<FormatRelativeOptions, "locale"> & {
    date: string;
  };

export const RelativeTime: FunctionComponent<RelativeTimeProps> = ({
  date,
  baseDate,
  ...props
}) => {
  const { i18n } = useTranslation();
  const [formattedDate, setFormattedDate] = useState<string>(
    formatRelative(date, {
      baseDate,
      locale: i18n.language,
    }),
  );

  useEffect(() => {
    const interval = setInterval(
      () =>
        setFormattedDate(
          formatRelative(date, {
            baseDate,
            locale: i18n.language,
          }),
        ),
      1000,
    );

    return () => clearInterval(interval);
  }, [date, baseDate, i18n.language]);

  return (
    <time dateTime={date} {...props}>
      {formattedDate}
    </time>
  );
};
