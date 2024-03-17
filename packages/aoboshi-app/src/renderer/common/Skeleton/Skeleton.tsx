import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import {
  skeletonContent,
  skeletonLight,
  skeletonVariants,
} from "./Skeleton.css";

type SkeletonProps = ComponentPropsWithoutRef<"div"> & {
  variant?: keyof typeof skeletonVariants;
  color?: "default" | "light";
  lineHeight?: number;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  variant = "text",
  color = "default",
  className,
  children,
  ...props
}) => {
  return (
    <div
      role="presentation"
      className={clsx(skeletonVariants[variant], className, {
        [skeletonLight]: color === "light",
      })}
      {...props}
    >
      {children && <div className={skeletonContent}>{children}</div>}
    </div>
  );
};
