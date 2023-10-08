import { style } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";
import { bodyMedium } from "../Typography/Typography.css";

export const tooltip = style([
  bodyMedium,
  {
    backgroundColor: vars.color.tooltip,
    color: "white",
    borderRadius: vars.shape.borderRadius,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
]);
