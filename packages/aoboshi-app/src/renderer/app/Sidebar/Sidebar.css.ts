import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";

export const sidebar = style({
  backgroundColor: theme.vars.color.surfaceContainerHigh,
  height: "100vh",
  paddingTop: `calc(${theme.vars.windowControls.height} + 8px)`,
  borderRightStyle: "solid",
  borderRightWidth: 1,
  borderRightColor: theme.vars.color.outlineVariant,
  paddingLeft: 8,
  paddingRight: 8,
});
