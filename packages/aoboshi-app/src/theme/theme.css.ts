import { createTheme } from "@vanilla-extract/css";
import chroma from "chroma-js";

const alpha = (color: string, value: number): string =>
  chroma(color).alpha(value).hex();

const hoverOpacity = 0.04;
const selectedOpacity = 0.08;
const focusOpacity = 0.12;
const activatedOpacity = 0.12;

type TonalValue =
  | 0
  | 10
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90
  | 95
  | 99
  | 100;
type TonalPalette = Record<TonalValue, string>;
const tonalValues: TonalValue[] = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100,
];

const createStatesPalette = (stateColor: string, primaryColor: string) => ({
  hover: alpha(stateColor, hoverOpacity),
  focus: alpha(stateColor, focusOpacity),
  selected: alpha(stateColor, selectedOpacity),
  activated: alpha(stateColor, activatedOpacity),
  hoverPrimary: alpha(primaryColor, hoverOpacity),
  focusPrimary: alpha(primaryColor, focusOpacity),
  selectedPrimary: alpha(primaryColor, selectedOpacity),
  activatedPrimary: alpha(primaryColor, activatedOpacity),
});

const createPalette = (color: string): TonalPalette => {
  const scale = chroma
    .scale(["black", color, "white"])
    .domain([0, 40, 100])
    .colors(tonalValues.length);

  return tonalValues.reduce((palette, tonalValue, index) => {
    palette[tonalValue] = scale[index];
    return palette;
  }, {} as TonalPalette);
};

const neutralTones = chroma
  .scale(["black", "white"])
  .domain([0, 100])
  .colors(101)
  .reduce(
    (palette, color, index) => {
      palette[index] = color;
      return palette;
    },
    {} as Record<string, string>,
  );

const primaryColor = "#0099f7";

export const keyColors = {
  primary: createPalette(primaryColor),
  neutral: tonalValues.reduce((palette, tonalValue) => {
    palette[tonalValue] = neutralTones[tonalValue];
    return palette;
  }, {} as TonalPalette),
};

export const lightPalette = {
  primary: {
    primary: primaryColor,
  },
  surface: {
    surface: neutralTones[100],
    surfaceContainer: neutralTones[99],
    surfaceContainerHigh: neutralTones[96],
    surfaceContainerHighest: neutralTones[90],
    onSurface: alpha(neutralTones[0], 0.87),
  },
  outline: {
    outline: neutralTones[0],
    outlineVariant: alpha(neutralTones[0], 0.12),
  },
  additional: {
    unseen: alpha(neutralTones[0], 0.1),
    stroke: neutralTones[13],
    strokeDim: neutralTones[88],
    strokeGrid: neutralTones[80],
  },
  states: createStatesPalette(neutralTones[0], primaryColor),
};

export const darkPalette = {
  primary: {
    primary: keyColors.primary[80],
  },
  surface: {
    surface: neutralTones[12],
    surfaceContainer: neutralTones[15],
    surfaceContainerHigh: neutralTones[18],
    surfaceContainerHighest: neutralTones[22],
    onSurface: alpha(neutralTones[100], 0.87),
  },
  outline: {
    outline: neutralTones[60],
    outlineVariant: neutralTones[25],
  },
  additional: {
    unseen: neutralTones[20],
    stroke: neutralTones[90],
    strokeDim: neutralTones[28],
    strokeGrid: neutralTones[28],
  },
  states: createStatesPalette(neutralTones[100], keyColors.primary[80]),
} satisfies typeof lightPalette;

const themeDefaults = {
  shape: {
    borderRadius: "9px",
  },
  typography: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
    fontSize: "13px",
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
