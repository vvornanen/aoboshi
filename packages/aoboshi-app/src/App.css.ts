import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const app = style({
  backgroundColor: vars.color.surface,
  color: vars.color.onSurface,
  minHeight: "100vh",
});
