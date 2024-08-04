import { keyframes, style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";

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
  stroke: theme.vars.color.strokeDim,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
});

export const hiddenStroke = style({
  visibility: "hidden",
});

export const currentStroke = style({
  stroke: theme.vars.color.stroke,
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
  color: theme.vars.color.strokeGrid,
});

export const strokeContent = style({
  position: "relative",
});
