import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";

export const card = style({
  padding: 16,
  backgroundColor: theme.vars.color.surface,
  borderRadius: theme.vars.shape.borderRadius,
});

export const outlined = style({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.vars.color.outlineVariant,
});

export const raised = style({
  border: "none",
  backgroundColor: theme.vars.color.surfaceContainer,
  boxShadow:
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
});
