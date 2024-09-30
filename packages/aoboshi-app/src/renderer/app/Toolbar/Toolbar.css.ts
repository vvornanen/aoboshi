import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { toggleButtonWidth } from "~app/SidebarLayout/SidebarLayout.css";
import { typographyVariant } from "~common/Typography/Typography.css";

export const toolbar = recipe({
  base: [
    typographyVariant({ variant: "bodyMedium" }),
    {
      display: "grid",
      gridTemplateAreas: "'actions search latestReview'",
      alignContent: "center",
      height: theme.vars.windowControls.height,
    },
  ],
  variants: {
    sidebarOpen: {
      false: {
        // TODO: var toolbarPaddingStart
        gridTemplateColumns: `calc(200px - ${theme.vars.windowControls.width} - ${toggleButtonWidth}) 1fr 200px`,
      },
      true: {
        gridTemplateColumns: `200px 1fr 200px`,
      },
    },
  },
});

export const search = style({
  gridArea: "search",
  justifySelf: "center",
});

export const latestReview = style({
  gridArea: "latestReview",
  display: "flex",
  justifyContent: "flex-end",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const latestReviewLabel = style({
  display: "inline",
  marginInlineEnd: "0.25em",
});

export const latestReviewTime = style({
  display: "inline",
});
