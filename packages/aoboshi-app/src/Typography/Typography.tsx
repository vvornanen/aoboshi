import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as typographyStyles from "./Typography.css";

export type TypographyVariant = keyof typeof typographyStyles;

type TypographyProps = ComponentPropsWithoutRef<"span"> & {
  variant?: TypographyVariant;
};

export const Typography: FunctionComponent<TypographyProps> = ({
  variant = "bodyMedium",
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(className, typographyStyles[variant])}
      {...props}
    ></span>
  );
};
