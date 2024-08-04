import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as styles from "./IconButton.css";

type IconButtonProps = ComponentPropsWithoutRef<"button">;

export const IconButton: FunctionComponent<IconButtonProps> = ({
  className,
  disabled,
  ...props
}) => (
  <button
    className={clsx(styles.iconButton, styles.defaultColor, className, {
      disabled,
    })}
    disabled={disabled}
    {...props}
  ></button>
);
