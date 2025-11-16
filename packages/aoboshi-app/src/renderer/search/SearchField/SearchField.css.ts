import { createVar, style } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import { typographyVariant } from "~common/Typography/Typography.css";
import { noDrag } from "~common/window.css";

const dialogWidth = createVar();

export const searchButton = style([
  typographyVariant({ variant: "bodyMedium" }),
  noDrag,
  {
    backgroundColor: theme.vars.color.surface,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.vars.color.outlineVariant,
    borderRadius: theme.vars.shape.borderRadiusSm,
    paddingBlock: 4,
    paddingInline: 8,
    userSelect: "none",
    textAlign: "start",
    selectors: {
      "&:hover": {
        backgroundColor: theme.vars.color.hover,
      },
      "&:focus-visible": {
        backgroundColor: theme.vars.color.focus,
      },
    },
  },
]);

export const searchButtonLabel = style({
  display: "inline-block", // Layout animation transforms do not work with inline
});

export const dialog = style([
  noDrag,
  {
    position: "fixed",
    top: 12,
    padding: 0,
    overflow: "hidden",
    left: `max(${theme.vars.windowControls.width}, calc(50% - ${dialogWidth} / 2))`,
    width: `min(${dialogWidth}, calc(100vw - 16px - ${theme.vars.windowControls.width}))`,
    vars: {
      [dialogWidth]: "650px",
    },
  },
]);

export const searchInput = style([
  typographyVariant({ variant: "bodyMedium" }),
  {
    backgroundColor: theme.vars.color.surface,
    borderStyle: "none none solid none",
    borderWidth: 1,
    borderColor: theme.vars.color.outlineVariant,
    paddingBlock: 12,
    paddingInline: 16,
    width: "100%",
    userSelect: "none",
    textAlign: "start",
  },
]);

export const item = style([
  typographyVariant({ variant: "bodyMedium" }),
  {
    paddingBlock: 12,
    paddingInline: 16,
    selectors: {
      "&:hover": {
        backgroundColor: theme.vars.color.hover,
      },
      "&:focus-visible": {
        backgroundColor: theme.vars.color.focus,
      },
    },
  },
]);

export const groupHeader = style([
  typographyVariant({ variant: "labelSmall" }),
  {
    color: theme.vars.color.onSurfaceVariant,
    paddingBlock: 12,
    paddingInline: 16,
  },
]);
