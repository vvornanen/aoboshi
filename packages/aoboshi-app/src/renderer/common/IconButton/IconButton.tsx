import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as styles from "./IconButton.css";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** An accessible label for the button */
  title: string;
};

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
