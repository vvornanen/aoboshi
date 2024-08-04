import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";

export const iconButton = recipe({
  base: {
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
      "&:focus-visible": {
        backgroundColor: theme.vars.color.focus,
      },
    },
  },
  variants: {
    color: {
      default: {
        color: theme.vars.color.icon,
      },
    },
    disabled: {
      true: {
        opacity: theme.vars.color.disabledOpacity,
        backgroundColor: "transparent",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});
