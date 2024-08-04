import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import * as typographyStyles from "~common/Typography/Typography.css";

export const wrapper = style([
  typographyStyles.bodyMedium,
  {
    backgroundColor: theme.vars.color.surface,
  },
]);
