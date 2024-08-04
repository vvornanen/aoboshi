import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";

export const iconButton = style({
  backgroundColor: "transparent",
  border: "none",
  borderRadius: theme.vars.shape.borderRadius,
  paddingTop: 4,
  paddingBottom: 4,
  paddingRight: 6,
  paddingLeft: 6,
  selectors: {
    "&:hover": {
      backgroundColor: theme.vars.color.hover,
    },
    "&:active": {
      backgroundColor: theme.vars.color.activated,
    },
    "&.disabled": {
      opacity: theme.vars.color.disabledOpacity,
      backgroundColor: "transparent",
    },
    "&:focus-visible": {
      backgroundColor: theme.vars.color.focus,
    },
  },
});

export const defaultColor = style({
  color: theme.vars.color.icon,
});
