import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as styles from "./Skeleton.css";
import { maru } from "~common";

type SkeletonProps = ComponentPropsWithoutRef<"div"> & {
  variant?: keyof typeof styles.skeletonVariants;
  color?: "default" | "light";

  /**
   * Number of characters to use as a placeholder text.
   * Skeleton uses this text content to infer its size based on the typography.
   */
  length?: number;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  variant = "text",
  color = "default",
  length,
  className,
  children,
  ...props
}) => {
  return (
    <div
      role="presentation"
      className={clsx(styles.skeletonVariants[variant], className, {
        [styles.skeletonLight]: color === "light",
      })}
      {...props}
    >
      {variant === "text" && length && (
        <div className={styles.skeletonContent}>{maru(length)}</div>
      )}
      {children && <div className={styles.skeletonContent}>{children}</div>}
    </div>
  );
};
