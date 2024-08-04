import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as styles from "./ListSubheader.css";

type ListSubheaderProps = ComponentPropsWithoutRef<"span">;

export const ListSubheader: FunctionComponent<ListSubheaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={clsx(styles.listSubheader, className)} {...props}>
      {children}
    </h2>
  );
};
