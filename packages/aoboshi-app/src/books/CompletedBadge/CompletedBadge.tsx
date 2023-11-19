import { FunctionComponent, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Badge, BadgeProps } from "@mui/base";
import { completedBadge, completedBadgeRoot } from "./CompletedBadge.css";

type CompletedBadgeProps = Omit<
  BadgeProps,
  "badgeContent" | "max" | "showZero"
>;

export const CompletedBadge: FunctionComponent<CompletedBadgeProps> = ({
  className,
  ...props
}) => {
  const [angle] = useState(Math.round(Math.random() * 30 - 15));
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
