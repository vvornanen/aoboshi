import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { toggleButtonWidth } from "~app/SidebarLayout/SidebarLayout.css";
import { typographyVariant } from "~common/Typography/Typography.css";
import { noDrag } from "~common/window.css";

const toolbarPaddingInlineStart = createVar();

export const toolbar = recipe({
  base: [
    typographyVariant({ variant: "bodyMedium" }),
    {
      display: "grid",
      gridTemplateAreas: "'actions search latestReview'",
      gridTemplateColumns: `calc(224px - ${toolbarPaddingInlineStart}) 1fr 224px`,
      alignContent: "center",
      height: theme.vars.windowControls.height,
    },
  ],
  variants: {
    sidebarOpen: {
      false: {
        vars: {
          [toolbarPaddingInlineStart]: `calc(${theme.vars.windowControls.width} - ${toggleButtonWidth})`,
        },
      },
      true: {
        vars: {
          [toolbarPaddingInlineStart]: "0",
        },
      },
    },
  },
});

export const search = style({
  gridArea: "search",
  justifySelf: "center",
  width: "clamp(100px, 100%, 300px)",
});

export const searchField = style({
  width: "100%",
});

export const latestReview = style({
  gridArea: "latestReview",
  justifySelf: "end",
});

export const latestReviewLabel = style({
  marginInlineEnd: "0.25em",
});

// TODO: Replace with reusable Button component
export const latestReviewButton = style([
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
