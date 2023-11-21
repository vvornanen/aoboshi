import { FunctionComponent, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { Badge, BadgeProps } from "@mui/base";
import { hash } from "@vvornanen/aoboshi-core";
import { completedBadge, completedBadgeRoot } from "./CompletedBadge.css";

type CompletedBadgeProps = Omit<
  BadgeProps,
  "badgeContent" | "max" | "showZero"
> & {
  /** Used for calculating a random angle */
  seed?: string;
};

export const CompletedBadge: FunctionComponent<CompletedBadgeProps> = ({
  className,
  seed,
  ...props
}) => {
  const maxAngle = 20;
  const angle = seed ? Math.round(hash(seed, maxAngle) * 2 - maxAngle) : 0;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateX(56px) translateY(-25%) rotate(${angle}deg)`;
    }
  }, [angle]);

  return (
    <Badge
      slotProps={{
        root: { className: clsx(completedBadgeRoot, className) },
        badge: { className: completedBadge, ref },
      }}
      badgeContent={"💮"}
      {...props}
    />
  );
};
