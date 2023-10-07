import { createTheme } from "@vanilla-extract/css";
import chroma from "chroma-js";

const alpha = (color: string, value: number): string =>
  chroma(color).alpha(value).hex();

const lighten = (color: string, value: number): string =>
  chroma(color).brighten(value).hex();

const lightPrimaryColor = "#0099f7";
const darkPrimaryColor = lighten(lightPrimaryColor, 0.5);
const hoverOpacity = 0.04;
const selectedOpacity = 0.08;
const focusOpacity = 0.12;
const activatedOpacity = 0.12;

const createStatesPalette = (stateColor: string, primaryColor: string) => ({
  hover: alpha(stateColor, hoverOpacity),
  hoverPrimary: alpha(primaryColor, hoverOpacity),
  focus: alpha(stateColor, focusOpacity),
  focusPrimary: alpha(primaryColor, focusOpacity),
  selected: alpha(stateColor, selectedOpacity),
  selectedPrimary: alpha(primaryColor, selectedOpacity),
  activated: alpha(stateColor, activatedOpacity),
  activatedPrimary: alpha(primaryColor, activatedOpacity),
  unseen: alpha(stateColor, 0.1),
});

export const lightPalette = {
  primary: {
    primary: lightPrimaryColor,
  },
  surface: {
    surface: "#ffffff",
    onSurface: alpha("#000000", 0.87),
  },
  outline: {
    outline: "#000000",
    outlineVariant: alpha("#000000", 0.12),
  },
  states: createStatesPalette("#000000", lightPrimaryColor),
};

export const darkPalette = {
  primary: {
    primary: darkPrimaryColor,
  },
  surface: {
    surface: "#121212",
    onSurface: "#ffffff",
  },
  outline: {
    outline: "#ffffff",
    outlineVariant: alpha("#ffffff", 0.12),
  },
  states: createStatesPalette("#ffffff", darkPrimaryColor),
} satisfies typeof lightPalette;

const themeDefaults = {
  shape: {
    borderRadius: "9px",
  },
  typography: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
    fontSize: "13px",
    textbook: {
      fontFamily: "YuKyokasho",
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
    tooltip: alpha("#212121", 0.92),
  },
});
