import { style } from "@vanilla-extract/css";
import { labelSmall } from "../Typography/Typography.css";
import { vars } from "../theme/theme.css";

export const listSubheader = style([
  labelSmall,
  {
    color: vars.color.onSurfaceVariant,
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 8,
    userSelect: "none",
  },
]);
