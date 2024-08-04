import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import { windowControlsHeight } from "~/renderer/styles.css";

export const sidebar = style({
  backgroundColor: theme.vars.color.surfaceContainerHigh,
  height: "100vh",
  flexShrink: 0,
  transform: "translateX(-100%)",
  transitionProperty: "transform",
  transitionDuration: "600ms",
  transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
  paddingTop: `calc(${windowControlsHeight} + 8px)`,
  borderRightStyle: "solid",
  borderRightWidth: 1,
  borderRightColor: theme.vars.color.outlineVariant,
  paddingLeft: 8,
  paddingRight: 8,
  selectors: {
    "&.open": {
      transform: "translateX(0%)",
    },
  },
});
