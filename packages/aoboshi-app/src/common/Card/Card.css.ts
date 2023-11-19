import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const card = style({
  padding: 16,
  backgroundColor: vars.color.surface,
  borderRadius: vars.shape.borderRadius,
});

export const outlined = style({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: vars.color.outlineVariant,
});

export const raised = style({
  border: "none",
  backgroundColor: vars.color.surfaceContainer,
  boxShadow:
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
});
