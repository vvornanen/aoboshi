import { forwardRef } from "react";
import { clsx } from "clsx";
import { buttonClasses, ButtonProps } from "@mui/base/Button";
import { useButton } from "@mui/base";
import * as styles from "./ListItem.css";

type ListItemProps = ButtonProps & {
  selected?: boolean;
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(
    { selected = false, disabled = false, className, href, children, ...props },
    ref,
  ) {
    const { active, focusVisible, getRootProps } = useButton({
      rootRef: ref,
      disabled,
      ...props,
    });

    return (
      <li>
        <a
          href={href}
          className={clsx(styles.listItem, className, {
            [styles.selected]: selected,
            [buttonClasses.active]: active,
            [buttonClasses.focusVisible]: focusVisible,
            [buttonClasses.disabled]: disabled,
          })}
          {...getRootProps()}
        >
          {children}
        </a>
      </li>
    );
  },
);
