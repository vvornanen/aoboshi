import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { list } from "./List.css";

type ListProps = ComponentPropsWithoutRef<"ul">;

export const List: FunctionComponent<ListProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ul className={clsx(list, className)} {...props}>
      {children}
    </ul>
  );
};
