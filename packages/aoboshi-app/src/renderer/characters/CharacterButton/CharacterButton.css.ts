import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { typographyVariant } from "~common/Typography/Typography.css";

export const characterButton = recipe({
  base: [
    typographyVariant({ variant: "textbookLarge" }),
    {
      width: 36,
      height: 36,
      backgroundColor: "transparent",
      color: theme.vars.color.onSurface,
      borderStyle: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.vars.shape.borderRadius,
      overflow: "hidden",
      whiteSpace: "nowrap",
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
  ],
  variants: {
    seen: {
      false: {
        color: theme.vars.color.unseen,
      },
    },
    highlight: {
      true: {
        opacity: 1,
        color: theme.vars.color.primary,
        outlineColor: theme.vars.color.primary,
        outlineWidth: 2,
        outlineStyle: "dashed",
        outlineOffset: -2,
        selectors: {
          "&:hover": {
            backgroundColor: theme.vars.color.hoverPrimary,
          },
          "&:active": {
            backgroundColor: theme.vars.color.activatedPrimary,
          },
          "&:focus-visible": {
            backgroundColor: theme.vars.color.focusPrimary,
          },
        },
      },
    },
    selected: {
      true: {
        backgroundColor: theme.vars.color.selected,
        selectors: {},
      },
    },
    disabled: {
      true: {
        opacity: theme.vars.color.disabledOpacity,
        backgroundColor: "transparent",
      },
    },
  },
  compoundVariants: [
    {
      variants: { highlight: true, selected: true },
      style: {
        backgroundColor: theme.vars.color.selectedPrimary,
      },
    },
  ],
  defaultVariants: {
    seen: true,
    highlight: false,
    selected: false,
    disabled: false,
  },
});
