import { ElementType, FunctionComponent, HTMLAttributes } from "react";
import { clsx } from "clsx";
import * as typographyStyles from "./Typography.css";

export type TypographyVariant = keyof typeof typographyStyles;

type TypographyProps = HTMLAttributes<"div"> & {
  variant?: TypographyVariant;
  component?: ElementType;
};

export const Typography: FunctionComponent<TypographyProps> = ({
  variant = "bodyMedium",
  className,
  component,
  ...props
}) => {
  const Component = component || "span";

  return (
    <Component
      className={clsx(className, typographyStyles[variant])}
      {...props}
    ></Component>
  );
};
