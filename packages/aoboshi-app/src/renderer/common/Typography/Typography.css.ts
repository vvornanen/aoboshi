import { createVar, style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

type VariantParameters = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
};

export const typographyLineHeight = createVar();

const createVariant = ({
  fontFamily,
  fontSize,
  fontWeight = 400,
  lineHeight = 1.5,
}: VariantParameters = {}) => {
  return {
    fontFamily: fontFamily || vars.typography.fontFamily,
    fontSize: fontSize ? `${fontSize}px` : vars.typography.fontSize,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
    vars: {
      [typographyLineHeight]: String(lineHeight),
    },
  };
};

export const headlineLarge = style(
  createVariant({
    fontFamily: vars.typography.fontFamily,
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.1,
  }),
);

export const headlineMedium = style(
  createVariant({
    fontFamily: vars.typography.fontFamily,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
  }),
);

export const textbookDisplay = style(
  createVariant({
    fontFamily: vars.typography.textbook.fontFamily,
    fontSize: 64,
  }),
);

export const textbookLarge = style(
  createVariant({
    fontFamily: vars.typography.textbook.fontFamily,
    fontSize: 24,
  }),
);

export const printDisplay = style(
  createVariant({
    fontFamily: vars.typography.print.fontFamily,
    fontSize: 64,
  }),
);

export const bodyLarge = style(createVariant({ fontSize: 15 }));

export const bodyMedium = style(createVariant({ fontSize: 13 }));

export const labelSmall = style(createVariant({ fontSize: 11 }));
