import { style } from "@vanilla-extract/css";
import { windowControlsHeight } from "../styles.css";

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  height: windowControlsHeight,
  transitionProperty: "padding-left",
  transitionDuration: "600ms",
  transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
});
