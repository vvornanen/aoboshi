import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as styles from "./Card.css";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "outlined" | "raised";
};

export const Card: FunctionComponent<CardProps> = ({
  variant = "outlined",
  className,
  ...props
}) => <div className={clsx(className, styles.card({ variant }))} {...props} />;
