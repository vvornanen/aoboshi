import { style } from "@vanilla-extract/css";
import { badgeClasses } from "@mui/base";

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
  selectors: {
    [`&.${badgeClasses.invisible}`]: {
      display: "none",
    },
  },
});
