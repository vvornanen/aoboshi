import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  height: theme.vars.windowControls.height,
  transitionProperty: "padding-left",
  transitionDuration: "600ms",
  transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
});
