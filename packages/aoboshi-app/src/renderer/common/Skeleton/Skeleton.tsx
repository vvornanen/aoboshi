import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { skeletonContent, skeletonVariants } from "./Skeleton.css";

type SkeletonProps = ComponentPropsWithoutRef<"div"> & {
  variant?: keyof typeof skeletonVariants;
  lineHeight?: number;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  variant = "text",
  className,
  children,
  ...props
}) => {
  return (
    <div
      role="presentation"
      className={clsx(skeletonVariants[variant], className)}
      {...props}
    >
      {children && <div className={skeletonContent}>{children}</div>}
    </div>
  );
};
