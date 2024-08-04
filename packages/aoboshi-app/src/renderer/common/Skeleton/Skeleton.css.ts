import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import * as typographyStyles from "~common/Typography/Typography.css";

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.4 },
  "100%": { opacity: 1 },
});

const skeletonBase = style({
  backgroundColor: theme.vars.color.disabled,
  animationName: pulse,
  animationDelay: "0.5s",
  animationTimingFunction: "ease-in-out",
  animationDuration: "2s",
  animationIterationCount: "infinite",
});

export const skeletonVariants = styleVariants({
  text: [
    skeletonBase,
    {
      width: "fit-content",
      transform: `scaleY(calc(1 / ${typographyStyles.typographyLineHeight}))`,
    },
  ],
  circular: [
    skeletonBase,
    {
      borderRadius: "50%",
    },
  ],
  rectangular: [skeletonBase, {}],
  rounded: [
    skeletonBase,
    {
      borderRadius: theme.vars.shape.borderRadius,
    },
  ],
  roundedSmall: [
    skeletonBase,
    {
      borderRadius: theme.vars.shape.borderRadiusSm,
    },
  ],
});

export const skeletonLight = style({
  backgroundColor: theme.vars.color.hover,
});

export const skeletonContent = style({
  width: "fit-content",
  visibility: "hidden",
});
