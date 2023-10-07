import { style } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";

export const card = style({
  padding: 16,
  backgroundColor: vars.color.surface,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: vars.color.outlineVariant,
  borderRadius: vars.shape.borderRadius,
});
