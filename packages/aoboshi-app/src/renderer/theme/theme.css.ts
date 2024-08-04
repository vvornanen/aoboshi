import { createTheme } from "@vanilla-extract/css";
import { alpha, darkPalette, lightPalette } from "./color";

const themeDefaults = {
  shape: {
    borderRadius: "9px",
    borderRadiusSm: "5px",
  },
  typography: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
    fontSize: `${13 / 16}rem`,
    textbook: {
      fontFamily: "YuKyokasho Yoko",
    },
    print: {
      fontFamily: "serif",
    },
  },
};

export const [lightThemeClass, vars] = createTheme({
  ...themeDefaults,
  color: {
    ...lightPalette.primary,
    ...lightPalette.surface,
    ...lightPalette.outline,
    ...lightPalette.states,
    ...lightPalette.additional,
    tooltip: alpha("#212121", 0.92),
  },
});

export const darkThemeClass = createTheme(vars, {
  ...themeDefaults,
  color: {
    ...darkPalette.primary,
    ...darkPalette.surface,
    ...darkPalette.outline,
    ...darkPalette.states,
    ...darkPalette.additional,
    tooltip: alpha("#212121", 0.92),
  },
});
