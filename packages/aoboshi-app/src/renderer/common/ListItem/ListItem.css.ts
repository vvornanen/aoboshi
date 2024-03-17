import { style } from "@vanilla-extract/css";
import { buttonClasses } from "@mui/base/Button";
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
    outline: "none",
    cursor: "default",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: vars.shape.borderRadiusSm,
    userSelect: "none",
    selectors: {
      "&:active": {
        color: "unset",
      },
      "&:visited": {
        color: "unset",
      },
      "&:hover": {
        backgroundColor: vars.color.hover,
      },
      [`&.${listItemClasses.active}`]: {
        backgroundColor: vars.color.activated,
      },
      [`&.${listItemClasses.focusVisible}`]: {
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
    [`&.${buttonClasses.active}`]: {
      backgroundColor: vars.color.primaryContainer,
      color: vars.color.onPrimaryContainer,
    },
  },
});
