import { style } from "@vanilla-extract/css";
import { windowControlsHeight, windowControlsWidth, drag } from "../styles.css";
import { zIndex } from "../theme/zIndex";

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
    height: windowControlsHeight,
    width: "100%",
    zIndex: -1,
  },
]);

export const toggleButton = style({
  position: "absolute",
  left: windowControlsWidth,
  top: `calc(${windowControlsHeight} / 2 - 14px)`,
  zIndex: zIndex.drawer + 1,
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  height: windowControlsHeight,
  transitionProperty: "margin-left",
  transitionDuration: "600ms",
  transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
});

export const content = style({
  paddingLeft: 16,
  paddingRight: 16,
  flexGrow: 1,
  transitionProperty: "margin-left",
  transitionDuration: "600ms",
  transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
});
