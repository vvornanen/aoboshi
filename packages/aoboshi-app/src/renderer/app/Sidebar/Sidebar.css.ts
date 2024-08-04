import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";

export const sidebar = recipe({
  base: {
    backgroundColor: theme.vars.color.surfaceContainerHigh,
    height: "100vh",
    flexShrink: 0,
    transform: "translateX(-100%)",
    transitionProperty: "transform",
    transitionDuration: "600ms",
    transitionTimingFunction: "cubic-bezier(.2,0,0,1)",
    paddingTop: `calc(${theme.vars.windowControls.height} + 8px)`,
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: theme.vars.color.outlineVariant,
    paddingLeft: 8,
    paddingRight: 8,
  },
  variants: {
    open: {
      true: {
        transform: "translateX(0%)",
      },
    },
  },
  defaultVariants: {
    open: false,
  },
});
