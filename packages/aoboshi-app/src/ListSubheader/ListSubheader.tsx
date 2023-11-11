import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { listSubheader } from "./ListSubheader.css";

type ListSubheaderProps = ComponentPropsWithoutRef<"span">;

export const ListSubheader: FunctionComponent<ListSubheaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={clsx(listSubheader, className)} {...props}>
      {children}
    </h2>
  );
};
