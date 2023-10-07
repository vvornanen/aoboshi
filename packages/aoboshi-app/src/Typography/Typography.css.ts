import { style } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";

type VariantParameters = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
};

const createVariant = ({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
}: VariantParameters = {}) => {
  return {
    fontFamily: fontFamily || vars.typography.fontFamily,
    fontSize: fontSize ? `${fontSize}px` : vars.typography.fontSize,
    fontWeight: fontWeight || 400,
    lineHeight: lineHeight || 1.5,
  };
};

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

export const bodyMedium = style(createVariant());

export const labelSmall = style(createVariant({ fontSize: 11 }));
