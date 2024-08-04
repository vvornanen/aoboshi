import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import * as typographyStyles from "~common/Typography/Typography.css";

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.4 },
  "100%": { opacity: 1 },
});

export const skeleton = recipe({
  base: {
    backgroundColor: theme.vars.color.disabled,
    animationName: pulse,
    animationDelay: "0.5s",
    animationTimingFunction: "ease-in-out",
    animationDuration: "2s",
    animationIterationCount: "infinite",
  },
  variants: {
    variant: {
      text: {
        width: "fit-content",
        transform: `scaleY(calc(1 / ${typographyStyles.lineHeight}))`,
      },
      circular: {
        borderRadius: "50%",
      },
      rectangular: {},
      rounded: {
        borderRadius: theme.vars.shape.borderRadius,
      },
      roundedSmall: {
        borderRadius: theme.vars.shape.borderRadiusSm,
      },
    },
    color: {
      default: {},
      light: {
        backgroundColor: theme.vars.color.hover,
      },
    },
  },
  defaultVariants: {
    variant: "text",
    color: "default",
  },
});

export const skeletonContent = style({
  width: "fit-content",
  visibility: "hidden",
});
