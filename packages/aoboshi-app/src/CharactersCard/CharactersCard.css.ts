import { style } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";

export const charactersCard = style({
  borderWidth: 1,
  borderRadius: vars.shape.borderRadius,
  borderColor: vars.color.outlineVariant,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "start",
  gap: 1,
});
