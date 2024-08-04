import { style } from "@vanilla-extract/css";
import * as typographyStyles from "~common/Typography/Typography.css";
import * as theme from "~theme/theme.css";

export const chapterProgress = style([
  typographyStyles.bodyMedium,
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
