import { createTheme, PaletteOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    textbook: React.CSSProperties;
    print: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    textbook: React.CSSProperties;
    print: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    textbook: true;
    print: true;
  }
}

const typography = {
  fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;",
  fontSize: 13,
  textbook: {
    fontFamily: "YuKyokasho",
  },
  print: {
    fontFamily: "serif",
  },
} satisfies TypographyOptions;

const lightPalette = {} satisfies PaletteOptions;

const darkPalette = {
  mode: "dark",
} satisfies PaletteOptions;

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
});
