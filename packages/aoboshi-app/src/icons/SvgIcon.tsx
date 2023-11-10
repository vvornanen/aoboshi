import {
  cloneElement,
  ComponentPropsWithoutRef,
  FunctionComponent,
  isValidElement,
} from "react";
import { clsx } from "clsx";
import { mediumSize, primaryColor } from "./SvgIcon.css";

export type SvgIconProps = ComponentPropsWithoutRef<"svg"> & {
  color?: "inherit" | "primary";
  size?: "medium";
};

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
    className: clsx(className, {
      [primaryColor]: color === "primary",
      [mediumSize]: size === "medium",
    }),
  };

  return cloneElement(children, svgProps);
};
