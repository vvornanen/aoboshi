import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { card, outlined, raised } from "./Card.css";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "outlined" | "raised";
};

export const Card: FunctionComponent<CardProps> = ({
  variant = "outlined",
  className,
  ...props
}) => (
  <div
    className={clsx(card, className, {
      [outlined]: variant === "outlined",
      [raised]: variant === "raised",
    })}
    {...props}
  />
);
