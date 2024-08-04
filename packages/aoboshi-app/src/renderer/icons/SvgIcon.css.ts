import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";

export const primaryColor = style({
  color: theme.vars.color.primary,
});

export const mediumSize = style({
  height: 20,
});
