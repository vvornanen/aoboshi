import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { iconsLayer } from "~/renderer/layers.css";

export const svgIcon = recipe({
  variants: {
    color: {
      inherit: iconsLayer({
        color: "inherit",
      }),
      primary: iconsLayer({
        color: theme.vars.color.primary,
      }),
    },
    size: {
      medium: iconsLayer({
        height: 20,
      }),
    },
  },
  defaultVariants: {
    color: "inherit",
    size: "medium",
  },
});
