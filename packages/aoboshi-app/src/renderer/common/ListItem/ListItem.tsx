import { ComponentPropsWithRef, forwardRef } from "react";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";
import { Skeleton } from "../Skeleton/Skeleton";
import * as styles from "./ListItem.css";
import { listItemClasses } from "./listItemClasses";

type ListItemProps = ComponentPropsWithRef<"a"> & {
  to: string;
  loading?: boolean;
  disabled?: boolean;
};

export const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  function ListItem(
    { disabled = false, loading = false, className, to, children, ...props },
    ref,
  ) {
    return (
      <li>
        <NavLink
          ref={ref}
          className={({ isActive }) =>
            clsx(styles.listItem, className, {
              [styles.selected]: to && isActive,
              [listItemClasses.disabled]: disabled,
              [listItemClasses.loading]: loading,
            })
          }
          to={to || ""}
          {...props}
        >
          {!loading && children}
          {loading && <Skeleton>{children}</Skeleton>}
        </NavLink>
      </li>
    );
  },
);
