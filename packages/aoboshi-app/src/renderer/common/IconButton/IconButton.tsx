import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { defaultColor, iconButton } from "./IconButton.css";

type IconButtonProps = ComponentPropsWithoutRef<"button">;

export const IconButton: FunctionComponent<IconButtonProps> = ({
  className,
  disabled,
  ...props
}) => (
  <button
    className={clsx(iconButton, defaultColor, className, { disabled })}
    disabled={disabled}
    {...props}
  ></button>
);
