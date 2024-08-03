import { createVar, style } from "@vanilla-extract/css";

export const badgeAngle = createVar();

export const completedBadgeRoot = style({
  position: "relative",
  display: "inline-block",
});

export const completedBadge = style({
  position: "absolute",
  top: 0,
  right: 0,
  fontSize: 48,
  lineHeight: 1,
  userSelect: "none",
  transform: `translateX(56px) translateY(-25%) rotate(${badgeAngle})`,
  vars: {
    [badgeAngle]: "0deg",
  },
});
