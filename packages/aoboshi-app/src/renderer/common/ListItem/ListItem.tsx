import { ComponentPropsWithRef, forwardRef } from "react";
import { clsx } from "clsx";
import { NavLink } from "react-router";
import * as styles from "./ListItem.css";
import { Skeleton } from "~common/Skeleton";

type ListItemProps = ComponentPropsWithRef<"a"> & {
  to?: string;
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
          aria-hidden={loading || undefined}
          tabIndex={loading ? -1 : undefined}
          className={({ isActive }) =>
            clsx(
              className,
              styles.listItem({
                selected: Boolean(to) && isActive,
                disabled,
                loading,
              }),
            )
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
