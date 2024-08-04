import { style } from "@vanilla-extract/css";
import { listItemClasses } from "./listItemClasses";
import * as typographyStyles from "~common/Typography/Typography.css";
import * as theme from "~theme/theme.css";

export const listItem = style([
  typographyStyles.bodyMedium,
  {
    display: "block",
    color: "inherit",
    backgroundColor: "unset",
    borderStyle: "none",
    textDecoration: "none",
    cursor: "default",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: theme.vars.shape.borderRadiusSm,
    userSelect: "none",
    selectors: {
      "&:visited": {
        color: "unset",
      },
      "&:hover": {
        backgroundColor: theme.vars.color.hover,
      },
      "&:active": {
        backgroundColor: theme.vars.color.activated,
      },
      "&:focus-visible": {
        backgroundColor: theme.vars.color.focus,
      },
      [`&.${listItemClasses.disabled}`]: {
        opacity: theme.vars.color.disabledOpacity,
        pointerEvents: "none",
      },
      [`&.${listItemClasses.loading}`]: {
        pointerEvents: "none",
      },
    },
  },
]);

export const selected = style({
  backgroundColor: theme.vars.color.primaryContainer,
  color: theme.vars.color.onPrimaryContainer,
  selectors: {
    "&:hover": {
      backgroundColor: theme.vars.color.primaryContainer,
      color: theme.vars.color.onPrimaryContainer,
    },
    "&.active": {
      backgroundColor: theme.vars.color.primaryContainer,
      color: theme.vars.color.onPrimaryContainer,
    },
  },
});
