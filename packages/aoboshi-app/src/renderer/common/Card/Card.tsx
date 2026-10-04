import { ComponentPropsWithRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as styles from "./Card.css";

type CardProps = ComponentPropsWithRef<"div"> & {
  variant?: "outlined" | "raised";
};

export const Card: FunctionComponent<CardProps> = ({
  variant = "outlined",
  className,
  ref,
  ...props
}) => {
  return (
    <div
      ref={ref}
      className={clsx(className, styles.card({ variant }))}
      {...props}
    />
  );
};
