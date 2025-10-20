import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { toggleButtonWidth } from "~app/SidebarLayout/SidebarLayout.css";
import { typographyVariant } from "~common/Typography/Typography.css";
import { noDrag } from "~common/window.css";

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
        gridTemplateColumns: `calc(224px - ${theme.vars.windowControls.width} - ${toggleButtonWidth}) 1fr 224px`,
      },
      true: {
        gridTemplateColumns: `224px 1fr 224px`,
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
  alignItems: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const latestReviewLabel = style([
  noDrag,
  {
    display: "inline",
    marginInlineEnd: "0.25em",
  },
]);

export const latestReviewTime = style([
  noDrag,
  {
    display: "inline",
  },
]);

// TODO: Replace with reusable Button component
export const latestReviewErrorButton = style([
  noDrag,
  {
    color: theme.vars.color.onSurface,
    backgroundColor: "transparent",
    border: "none",
    borderRadius: theme.vars.shape.borderRadius,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 6,
    paddingLeft: 6,
    selectors: {
      "&:hover": {
        backgroundColor: theme.vars.color.hover,
      },
      "&:active": {
        backgroundColor: theme.vars.color.activated,
      },
      "&:focus-visible": {
        backgroundColor: theme.vars.color.focus,
      },
    },
  },
]);
