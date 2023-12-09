import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/theme.css";
import { bodyMedium } from "../../../common/Typography/Typography.css";

export const circledFigure = style({
  display: "inline-block",
  height: 22,
  borderRadius: 11,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: vars.color.outline,
  paddingLeft: 6,
  paddingRight: 6,
  marginLeft: -6,
  marginRight: -6,
});

export const figures = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  height: "100%",
});

export const figure = style([
  bodyMedium,
  {
    whiteSpace: "nowrap",
  },
]);

export const references = style([
  figure,
  {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
]);
