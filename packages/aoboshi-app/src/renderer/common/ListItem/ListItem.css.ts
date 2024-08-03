import { style } from "@vanilla-extract/css";
import { bodyMedium } from "../Typography/Typography.css";
import { vars } from "../../theme/theme.css";
import { listItemClasses } from "./listItemClasses";

export const listItem = style([
  bodyMedium,
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
    borderRadius: vars.shape.borderRadiusSm,
    userSelect: "none",
    selectors: {
      "&:visited": {
        color: "unset",
      },
      "&:hover": {
        backgroundColor: vars.color.hover,
      },
      "&:active": {
        backgroundColor: vars.color.activated,
      },
      "&:focus-visible": {
        backgroundColor: vars.color.focus,
      },
      [`&.${listItemClasses.disabled}`]: {
        opacity: vars.color.disabledOpacity,
        pointerEvents: "none",
      },
      [`&.${listItemClasses.loading}`]: {
        pointerEvents: "none",
      },
    },
  },
]);

export const selected = style({
  backgroundColor: vars.color.primaryContainer,
  color: vars.color.onPrimaryContainer,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.primaryContainer,
      color: vars.color.onPrimaryContainer,
    },
    "&.active": {
      backgroundColor: vars.color.primaryContainer,
      color: vars.color.onPrimaryContainer,
    },
  },
});
