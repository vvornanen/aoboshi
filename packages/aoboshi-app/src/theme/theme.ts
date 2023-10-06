import {
  alpha,
  createTheme,
  lighten,
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

const lightPalette = {
  primary: {
    main: "#0099f7",
  },
} satisfies PaletteOptions;

const darkPalette = {
  primary: {
    main: lighten(lightPalette.primary.main, 0.5),
  },
  mode: "dark",
} satisfies PaletteOptions;

const createAppTheme = (themeOptions: ThemeOptions) => {
  const theme = createTheme(themeOptions);

  const tooltipColor = alpha(theme.palette.grey[900], 0.92);

  return createTheme(theme, {
    shape: {
      borderRadius: 9,
    },
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
