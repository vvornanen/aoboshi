import { ElementType, FunctionComponent, HTMLAttributes } from "react";
import { clsx } from "clsx";
import { RecipeVariants } from "@vanilla-extract/recipes";
import * as typographyStyles from "./Typography.css";

export type TypographyProps = HTMLAttributes<"div"> &
  RecipeVariants<typeof typographyStyles.typographyVariant> & {
    component?: ElementType;
  };

export type TypographyVariant = TypographyProps["variant"];

export const Typography: FunctionComponent<TypographyProps> = ({
  variant = "bodyMedium",
  className,
  component,
  ...props
}) => {
  const Component = component || "span";

  return (
    <Component
      className={clsx(
        className,
        typographyStyles.typographyVariant({ variant }),
      )}
      {...props}
    ></Component>
  );
};
