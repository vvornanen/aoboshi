import { style } from "@vanilla-extract/css";
import * as typographyStyles from "~common/Typography/Typography.css";
import * as theme from "~theme/theme.css";

export const listSubheader = style([
  typographyStyles.labelSmall,
  {
    color: theme.vars.color.onSurfaceVariant,
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 8,
    userSelect: "none",
  },
]);
