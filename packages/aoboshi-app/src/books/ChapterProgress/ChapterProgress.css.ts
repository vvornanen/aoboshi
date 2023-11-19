import { style } from "@vanilla-extract/css";
import { bodyMedium } from "../../Typography/Typography.css";
import { vars } from "../../theme/theme.css";

export const chapterProgress = style([
  bodyMedium,
  {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
]);

export const progressBar = style({
  borderRadius: vars.shape.borderRadiusSm,
});

export const reviewedBar = style({
  color: vars.color.primary,
});

export const unreviewedBar = style({
  color: vars.color.primary,
  opacity: 0.4,
});

export const unseenBar = style({
  color: vars.color.unseen,
});
