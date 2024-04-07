import { style } from "@vanilla-extract/css";
import { buttonClasses } from "@mui/base/Button";
import { vars } from "../../theme/theme.css";

export const iconButton = style({
  backgroundColor: "transparent",
  border: "none",
  borderRadius: vars.shape.borderRadius,
  paddingTop: 4,
  paddingBottom: 4,
  paddingRight: 6,
  paddingLeft: 6,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.hover,
    },
    [`&.${buttonClasses.active}`]: {
      backgroundColor: vars.color.activated,
    },
    [`&.${buttonClasses.disabled}`]: {
      opacity: vars.color.disabledOpacity,
      backgroundColor: "transparent",
    },
    [`&.${buttonClasses.focusVisible}`]: {
      backgroundColor: vars.color.focus,
    },
  },
});

export const defaultColor = style({
  color: vars.color.icon,
});
