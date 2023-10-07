import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";
import { strokeClasses } from "./strokeClasses";

const strokeActive = keyframes({
  "0%": {
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
  },
  "100%": {
    strokeDashoffset: 0,
  },
});

export const stroke = style({
  strokeWidth: 4,
  stroke: vars.color.unseen,
  selectors: {
    [`&.${strokeClasses.hidden}`]: {
      visibility: "hidden",
    },
    [`&.${strokeClasses.current}`]: {
      stroke: vars.color.onSurface,
    },
  },
  [`&.${strokeClasses.current}:hover`]: {
    animation: `${strokeActive} 5s ease-in-out forwards`,
  },
});

export const strokeBackground = style({
  position: "relative",
});

export const strokeGrid = style({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  pointerEvents: "none",
  color: vars.color.outlineVariant,
});

export const strokeContent = style({
  position: "relative",
});
