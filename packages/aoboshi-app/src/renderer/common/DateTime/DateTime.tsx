import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "~common/DateTime/formatDateTime";

export type DateTimeProps = Omit<
  ComponentPropsWithoutRef<"time">,
  "dateTime" | "children"
> & {
  value: string;
};

export const DateTime: FunctionComponent<DateTimeProps> = ({
  value,
  ...props
}) => {
  const { i18n } = useTranslation();

  const formattedValue = formatDateTime(value, { locale: i18n.language });

  return (
    <time dateTime={value} {...props}>
      {formattedValue}
    </time>
  );
};
