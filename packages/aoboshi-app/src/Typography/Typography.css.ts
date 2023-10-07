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
  return style({
    fontFamily: fontFamily || vars.typography.fontFamily,
    fontSize: fontSize ? `${fontSize}px` : vars.typography.fontSize,
    fontWeight: fontWeight || 400,
    lineHeight: lineHeight || 1.5,
  });
};

export const textbookDisplay = createVariant({
  fontFamily: vars.typography.textbook.fontFamily,
  fontSize: 64,
});

export const textbookLarge = createVariant({
  fontFamily: vars.typography.textbook.fontFamily,
  fontSize: 20,
});

export const printDisplay = createVariant({
  fontFamily: vars.typography.print.fontFamily,
  fontSize: 64,
});

export const bodyMedium = createVariant();

export const labelSmall = createVariant({ fontSize: 11 });
