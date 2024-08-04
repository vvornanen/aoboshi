import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  cloneElement,
  isValidElement,
} from "react";
import { clsx } from "clsx";
import { RecipeVariants } from "@vanilla-extract/recipes";
import * as styles from "./SvgIcon.css";

export type SvgIconProps = ComponentPropsWithoutRef<"svg"> &
  RecipeVariants<typeof styles.svgIcon>;

export const SvgIcon: FunctionComponent<SvgIconProps> = ({
  color = "inherit",
  size = "medium",
  className,
  children: childrenProp,
  ...props
}) => {
  const children = isValidElement(childrenProp) ? (
    childrenProp
  ) : (
    <svg>{childrenProp}</svg>
  );

  const svgProps = {
    ...children.props,
    ...props,
    className: clsx(className, styles.svgIcon({ color, size })),
  };

  return cloneElement(children, svgProps);
};
