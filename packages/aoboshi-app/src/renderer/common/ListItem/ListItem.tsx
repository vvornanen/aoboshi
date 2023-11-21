import { forwardRef } from "react";
import { clsx } from "clsx";
import { buttonClasses, ButtonProps } from "@mui/base/Button";
import { useButton } from "@mui/base";
import { NavLink } from "react-router-dom";
import * as styles from "./ListItem.css";

type ListItemProps = ButtonProps;

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(
    { disabled = false, className, to, children, ...props },
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
              [styles.selected]: isActive,
              [buttonClasses.active]: active,
              [buttonClasses.focusVisible]: focusVisible,
              [buttonClasses.disabled]: disabled,
            })
          }
          {...getRootProps()}
          to={to || ""}
        >
          {children}
        </NavLink>
      </li>
    );
  },
);
