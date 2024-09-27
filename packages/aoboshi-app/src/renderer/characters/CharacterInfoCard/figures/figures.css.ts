import { style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import { typographyVariant } from "~common/Typography/Typography.css";

export const figure = style([
  typographyVariant({ variant: "bodyMedium" }),
  {
    whiteSpace: "nowrap",
    border: "none",
    color: "inherit",
    backgroundColor: "transparent",
    padding: 0,
    selectors: {
      "&:focus-visible": {
        backgroundColor: theme.vars.color.focus,
      },
    },
  },
]);

export const circledFigure = style([
  figure,
  {
    display: "inline-block",
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.vars.color.outline,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: -6,
    marginRight: -6,
  },
]);

export const figures = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  height: "100%",
});

export const references = style([
  figure,
  {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
]);
