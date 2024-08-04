import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";

const pxToRem = (value: number) => `${value / 16}rem`;

export const lineHeight = createVar();

export const typographyVariant = recipe({
  base: {
    fontFamily: theme.vars.typography.fontFamily,
    fontSize: theme.vars.typography.fontSize,
    fontWeight: 400,
    lineHeight: lineHeight,
    vars: {
      [lineHeight]: "1.5",
    },
  },
  variants: {
    variant: {
      headlineLarge: {
        fontSize: pxToRem(22),
        fontWeight: 700,
        vars: {
          [lineHeight]: "1.1",
        },
      },
      headlineMedium: {
        fontSize: pxToRem(16),
        fontWeight: 700,
        vars: {
          [lineHeight]: "1.2",
        },
      },
      textbookDisplay: {
        fontFamily: theme.vars.typography.textbook.fontFamily,
        fontSize: pxToRem(64),
      },
      textbookLarge: {
        fontFamily: theme.vars.typography.textbook.fontFamily,
        fontSize: pxToRem(24),
      },
      printDisplay: {
        fontFamily: theme.vars.typography.print.fontFamily,
        fontSize: pxToRem(64),
      },
      bodyLarge: { fontSize: pxToRem(15) },
      bodyMedium: { fontSize: pxToRem(13) },
      labelSmall: { fontSize: pxToRem(11) },
    },
  },
});
