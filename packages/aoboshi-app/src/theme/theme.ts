import {
  alpha,
  createTheme,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material";
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

const createAppTheme = (themeOptions: ThemeOptions) => {
  const theme = createTheme(themeOptions);

  const tooltipColor = alpha(theme.palette.grey[900], 0.92);

  return createTheme(theme, {
    components: {
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
        styleOverrides: {
          tooltip: {
            ...theme.typography.body2,
            backgroundColor: tooltipColor,
          },
          arrow: {
            color: tooltipColor,
          },
        },
      },
    },
  });
};

export const lightTheme = createAppTheme({
  palette: lightPalette,
  typography,
});

export const darkTheme = createAppTheme({
  palette: darkPalette,
  typography,
});
