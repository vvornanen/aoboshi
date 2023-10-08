import { style } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";

/**
 * Bordered box for all grid elements within {@link CharacterInfoCard}.
 */
const borderedBox = style({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: vars.color.outline,
});

export const infoBox = style([
  borderedBox,
  {
    position: "relative",
  },
]);

export const infoBoxContainer = style([
  borderedBox,
  {
    boxSizing: "content-box",
    display: "grid",
    gridAutoFlow: "row",
  },
]);
