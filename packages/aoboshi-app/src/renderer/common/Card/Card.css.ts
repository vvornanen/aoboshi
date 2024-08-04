import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";

export const card = recipe({
  base: {
    padding: 16,
    backgroundColor: theme.vars.color.surface,
    borderRadius: theme.vars.shape.borderRadius,
  },
  variants: {
    variant: {
      outlined: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.vars.color.outlineVariant,
      },
      raised: {
        border: "none",
        backgroundColor: theme.vars.color.surfaceContainer,
        boxShadow:
          "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});
