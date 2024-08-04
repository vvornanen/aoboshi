import { style } from "@vanilla-extract/css";
import { zIndex } from "~theme";
import { drag } from "~common/window.css";
import * as theme from "~theme/theme.css";

export const layout = style({
  position: "relative",
  display: "flex",
  justifyContent: "stretch",
  height: "100vh",
});

export const dragRegion = style([
  drag,
  {
    position: "absolute",
    height: theme.vars.windowControls.height,
    width: "100%",
    zIndex: -1,
  },
]);

export const toggleButton = style({
  position: "absolute",
  left: theme.vars.windowControls.width,
  top: `calc(${theme.vars.windowControls.height} / 2 - 14px)`,
  zIndex: zIndex.drawer + 1,
});

export const content = style({
  flexGrow: 1,
  transitionProperty: "margin-left",
  transitionDuration: "600ms",
  transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
});
