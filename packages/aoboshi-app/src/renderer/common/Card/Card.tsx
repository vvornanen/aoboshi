import { ComponentPropsWithoutRef, forwardRef } from "react";
import { clsx } from "clsx";
import * as styles from "./Card.css";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "outlined" | "raised";
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "outlined", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(className, styles.card({ variant }))}
      {...props}
    />
  );
});
