import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import { typographyVariant } from "~common/Typography/Typography.css";
import { commonLayer } from "~/renderer/layers.css";

export const tooltip = style([
  typographyVariant({ variant: "bodyMedium" }),
  commonLayer({
    backgroundColor: theme.vars.color.tooltip,
    color: "white",
    borderRadius: theme.vars.shape.borderRadius,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    selectors: {
      "&[data-side='top']": {
        transformOrigin: "50% 100%",
      },
      "&[data-side='right']": {
        transformOrigin: "0% 50%",
      },
      "&[data-side='bottom']": {
        transformOrigin: "50% 0%",
      },
      "&[data-side='left']": {
        transformOrigin: "100% 50%",
      },
    },
  }),
]);

export const tooltipArrow = style(
  commonLayer({
    fill: theme.vars.color.tooltip,
  }),
);
