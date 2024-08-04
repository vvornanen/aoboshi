import { style } from "@vanilla-extract/css";
import { characterButtonClasses } from "./characterButtonClasses";
import * as typographyStyles from "~common/Typography/Typography.css";
import * as theme from "~theme/theme.css";

export const characterButton = style([
  typographyStyles.textbookLarge,
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
      [`&.${characterButtonClasses.highlight}:hover`]: {
        backgroundColor: theme.vars.color.hoverPrimary,
      },
      [`&.${characterButtonClasses.highlight}:active`]: {
        backgroundColor: theme.vars.color.activatedPrimary,
      },
      "&:active": {
        backgroundColor: theme.vars.color.activated,
      },
      "&:focus-visible": {
        backgroundColor: theme.vars.color.focus,
      },
      [`&.${characterButtonClasses.highlight}:focus-visible`]: {
        backgroundColor: theme.vars.color.focusPrimary,
      },
      [`&.${characterButtonClasses.unseen}`]: {
        color: theme.vars.color.unseen,
      },
      [`&.${characterButtonClasses.highlight}`]: {
        opacity: 1,
        color: theme.vars.color.primary,
        outlineColor: theme.vars.color.primary,
        outlineWidth: 2,
        outlineStyle: "dashed",
        outlineOffset: -2,
      },
      [`&.${characterButtonClasses.selected}`]: {
        backgroundColor: theme.vars.color.selected,
      },
      [`&.${characterButtonClasses.selected}.${characterButtonClasses.highlight}`]:
        {
          backgroundColor: theme.vars.color.selectedPrimary,
        },
      "&.disabled": {
        opacity: theme.vars.color.disabledOpacity,
        backgroundColor: "transparent",
      },
    },
  },
]);
