import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import * as typographyStyles from "~common/Typography/Typography.css";

export const tooltip = style([
  typographyStyles.bodyMedium,
  {
    backgroundColor: theme.vars.color.tooltip,
    color: "white",
    borderRadius: theme.vars.shape.borderRadius,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
]);
