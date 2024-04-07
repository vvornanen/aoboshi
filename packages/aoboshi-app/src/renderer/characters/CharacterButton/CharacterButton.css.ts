import { style } from "@vanilla-extract/css";
import { buttonClasses } from "@mui/base/Button";
import { textbookLarge } from "../../common/Typography/Typography.css";
import { vars } from "../../theme/theme.css";
import { characterButtonClasses } from "./characterButtonClasses";

export const characterButton = style([
  textbookLarge,
  {
    width: 36,
    height: 36,
    backgroundColor: "transparent",
    color: vars.color.onSurface,
    borderStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.shape.borderRadius,
    overflow: "hidden",
    whiteSpace: "nowrap",
    selectors: {
      "&:hover": {
        backgroundColor: vars.color.hover,
      },
      [`&.${characterButtonClasses.highlight}:hover`]: {
        backgroundColor: vars.color.hoverPrimary,
      },
      [`&.${characterButtonClasses.highlight}.${buttonClasses.active}`]: {
        backgroundColor: vars.color.activatedPrimary,
      },
      [`&.${buttonClasses.active}`]: {
        backgroundColor: vars.color.activated,
      },
      [`&.${buttonClasses.focusVisible}`]: {
        backgroundColor: vars.color.focus,
      },
      [`&.${characterButtonClasses.highlight}.${buttonClasses.focusVisible}`]: {
        backgroundColor: vars.color.focusPrimary,
      },
      [`&.${characterButtonClasses.unseen}`]: {
        color: vars.color.unseen,
      },
      [`&.${characterButtonClasses.highlight}`]: {
        opacity: 1,
        color: vars.color.primary,
        outlineColor: vars.color.primary,
        outlineWidth: 2,
        outlineStyle: "dashed",
        outlineOffset: -2,
      },
      [`&.${characterButtonClasses.selected}`]: {
        backgroundColor: vars.color.selected,
      },
      [`&.${characterButtonClasses.selected}.${characterButtonClasses.highlight}`]:
        {
          backgroundColor: vars.color.selectedPrimary,
        },
    },
  },
]);
