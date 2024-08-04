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
    className={clsx(
      className,
      styles.iconButton({
        disabled,
      }),
    )}
    disabled={disabled}
    {...props}
  ></button>
);
