import { style } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";
import { windowControlsHeight } from "../styles.css";

export const sidebar = style({
  backgroundColor: vars.color.surfaceContainerHigh,
  height: "100vh",
  transform: "translateX(-100%)",
  transitionProperty: "all",
  transitionDuration: "600ms",
  transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
  paddingTop: `calc(${windowControlsHeight} + 8px)`,
  borderRightStyle: "solid",
  borderRightWidth: 1,
  borderRightColor: vars.color.outlineVariant,
  paddingLeft: 16,
  paddingRight: 16,
  selectors: {
    "&.open": {
      transform: "translateX(0%)",
    },
  },
});
