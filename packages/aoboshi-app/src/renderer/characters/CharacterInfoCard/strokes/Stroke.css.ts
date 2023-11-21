import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/theme.css";

const strokeActive = keyframes({
  "0%": {
    strokeDasharray: 400,
    strokeDashoffset: 400,
  },
  "100%": {
    strokeDashoffset: 0,
  },
});

export const strokeContainer = style({});

export const stroke = style({
  strokeWidth: 4,
  stroke: vars.color.strokeDim,
});

export const hiddenStroke = style({
  visibility: "hidden",
});

export const currentStroke = style({
  stroke: vars.color.stroke,
  zIndex: 1,
  selectors: {
    [`.${strokeContainer}:hover &`]: {
      animation: `${strokeActive} 8s cubic-bezier(.24,.08,0,.71) forwards`,
    },
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
  color: vars.color.strokeGrid,
});

export const strokeContent = style({
  position: "relative",
});
