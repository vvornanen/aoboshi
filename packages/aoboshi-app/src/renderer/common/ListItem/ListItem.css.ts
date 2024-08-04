import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { typographyVariant } from "~common/Typography/Typography.css";
import { commonLayer } from "~/renderer/layers.css";

export const listItem = recipe({
  base: [
    typographyVariant({ variant: "bodyMedium" }),
    commonLayer({
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
      },
    }),
  ],
  variants: {
    selected: {
      true: commonLayer({
        backgroundColor: theme.vars.color.primaryContainer,
        color: theme.vars.color.onPrimaryContainer,
        selectors: {
          "&:hover": {
            backgroundColor: theme.vars.color.primaryContainer,
            color: theme.vars.color.onPrimaryContainer,
          },
        },
      }),
    },
    loading: {
      true: commonLayer({
        pointerEvents: "none",
      }),
    },
    disabled: {
      true: commonLayer({
        opacity: theme.vars.color.disabledOpacity,
        pointerEvents: "none",
      }),
    },
  },
  defaultVariants: {
    selected: false,
    loading: false,
    disabled: false,
  },
});
