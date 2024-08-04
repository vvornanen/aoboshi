import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import { typographyVariant } from "~common/Typography/Typography.css";

export const chapterProgress = style([
  typographyVariant({ variant: "bodyMedium" }),
  {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
]);

export const progressBar = style({
  borderRadius: theme.vars.shape.borderRadiusSm,
});

export const reviewedBar = style({
  color: theme.vars.color.primary,
});

export const unreviewedBar = style({
  color: theme.vars.color.primary,
  opacity: 0.4,
});

export const unseenBar = style({
  color: theme.vars.color.unseen,
});
