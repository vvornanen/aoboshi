import { forwardRef } from "react";
import { clsx } from "clsx";
import { ButtonProps } from "@mui/base/Button";
import { useButton } from "@mui/base";
import { NavLink } from "react-router-dom";
import { Skeleton } from "../Skeleton/Skeleton";
import * as styles from "./ListItem.css";
import { listItemClasses } from "./listItemClasses";

type ListItemProps = ButtonProps & {
  loading?: boolean;
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(
    { disabled = false, loading = false, className, to, children, ...props },
    ref,
  ) {
    const { active, focusVisible, getRootProps } = useButton({
      rootRef: ref,
      disabled,
      ...props,
    });

    return (
      <li>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.listItem, className, {
              [styles.selected]: to && isActive,
              [listItemClasses.active]: active,
              [listItemClasses.focusVisible]: focusVisible,
              [listItemClasses.disabled]: disabled,
              [listItemClasses.loading]: loading,
            })
          }
          {...getRootProps()}
          to={to || ""}
        >
          {!loading && children}
          {loading && <Skeleton>{children}</Skeleton>}
        </NavLink>
      </li>
    );
  },
);
