import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";
import { typographyLineHeight } from "../Typography/Typography.css";

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.5 },
  "100%": { opacity: 1 },
});

const skeletonBase = style({
  backgroundColor: vars.color.activated,
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
      transform: `scaleY(calc(1 / ${typographyLineHeight}))`,
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
      borderRadius: vars.shape.borderRadius,
    },
  ],
  roundedSmall: [
    skeletonBase,
    {
      borderRadius: vars.shape.borderRadiusSm,
    },
  ],
});

export const skeletonContent = style({
  width: "fit-content",
  visibility: "hidden",
});
