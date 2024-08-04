import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { commonLayer } from "~/renderer/layers.css";

export const card = recipe({
  base: commonLayer({
    padding: 16,
    backgroundColor: theme.vars.color.surface,
    borderRadius: theme.vars.shape.borderRadius,
  }),
  variants: {
    variant: {
      outlined: commonLayer({
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.vars.color.outlineVariant,
      }),
      raised: commonLayer({
        border: "none",
        backgroundColor: theme.vars.color.surfaceContainer,
        boxShadow:
          "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
      }),
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});
