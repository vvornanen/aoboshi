import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import * as typographyStyles from "~common/Typography/Typography.css";
import { commonLayer } from "~/renderer/layers.css";

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.4 },
  "100%": { opacity: 1 },
});

export const skeleton = recipe({
  base: commonLayer({
    backgroundColor: theme.vars.color.disabled,
    animationName: pulse,
    animationDelay: "0.5s",
    animationTimingFunction: "ease-in-out",
    animationDuration: "2s",
    animationIterationCount: "infinite",
  }),
  variants: {
    variant: {
      text: commonLayer({
        width: "fit-content",
        transform: `scaleY(calc(1 / ${typographyStyles.lineHeight}))`,
      }),
      circular: commonLayer({
        borderRadius: "50%",
      }),
      rectangular: commonLayer({}),
      rounded: commonLayer({
        borderRadius: theme.vars.shape.borderRadius,
      }),
      roundedSmall: commonLayer({
        borderRadius: theme.vars.shape.borderRadiusSm,
      }),
    },
    color: {
      default: commonLayer({}),
      light: commonLayer({
        backgroundColor: theme.vars.color.hover,
      }),
    },
  },
  defaultVariants: {
    variant: "text",
    color: "default",
  },
});

export const skeletonContent = style(
  commonLayer({
    width: "fit-content",
    visibility: "hidden",
  }),
);
