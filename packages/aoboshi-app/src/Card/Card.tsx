import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { card } from "./Card.css";

type CardProps = ComponentPropsWithoutRef<"div">;

export const Card: FunctionComponent<CardProps> = ({ className, ...props }) => (
  <div className={clsx(card, className)} {...props} />
);
