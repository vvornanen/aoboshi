import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as theme from "~theme/theme.css";
import { typographyLayer } from "~/renderer/layers.css";

const pxToRem = (value: number) => `${value / 16}rem`;

export const lineHeight = createVar();

export const typographyVariant = recipe({
  base: typographyLayer({
    fontFamily: theme.vars.typography.fontFamily,
    fontSize: theme.vars.typography.fontSize,
    fontWeight: 400,
    lineHeight: lineHeight,
    vars: {
      [lineHeight]: "1.5",
    },
  }),
  variants: {
    variant: {
      headlineLarge: typographyLayer({
        fontSize: pxToRem(22),
        fontWeight: 700,
        vars: {
          [lineHeight]: "1.1",
        },
      }),
      headlineMedium: typographyLayer({
        fontSize: pxToRem(16),
        fontWeight: 700,
        vars: {
          [lineHeight]: "1.2",
        },
      }),
      textbookDisplay: typographyLayer({
        fontFamily: theme.vars.typography.textbook.fontFamily,
        fontSize: pxToRem(64),
      }),
      textbookLarge: typographyLayer({
        fontFamily: theme.vars.typography.textbook.fontFamily,
        fontSize: pxToRem(24),
      }),
      printDisplay: typographyLayer({
        fontFamily: theme.vars.typography.print.fontFamily,
        fontSize: pxToRem(64),
      }),
      bodyLarge: typographyLayer({ fontSize: pxToRem(15) }),
      bodyMedium: typographyLayer({ fontSize: pxToRem(13) }),
      labelSmall: typographyLayer({ fontSize: pxToRem(11) }),
    },
  },
});
