import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import { typographyVariant } from "~common/Typography/Typography.css";
import { commonLayer } from "~/renderer/layers.css";

export const listSubheader = style([
  typographyVariant({ variant: "labelSmall" }),
  commonLayer({
    color: theme.vars.color.onSurfaceVariant,
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 8,
    userSelect: "none",
  }),
]);
