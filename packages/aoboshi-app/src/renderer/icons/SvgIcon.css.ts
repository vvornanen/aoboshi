import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";

export const svgIcon = recipe({
  variants: {
    color: {
      inherit: {
        color: "inherit",
      },
      primary: {
        color: theme.vars.color.primary,
      },
    },
    size: {
      medium: {
        height: 20,
      },
    },
  },
  defaultVariants: {
    color: "inherit",
    size: "medium",
  },
});
