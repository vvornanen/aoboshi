import { style } from "@vanilla-extract/css";
import { vars } from "~theme/theme.css";

export const primaryColor = style({
  color: vars.color.primary,
});

export const mediumSize = style({
  height: 20,
});
