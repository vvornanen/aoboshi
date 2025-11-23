/* eslint-disable import/no-named-as-default-member */
import chroma from "chroma-js";

export const alpha = (color: string, value: number): string =>
  chroma(color).alpha(value).hex();

const hoverOpacity = 0.04;
const selectedOpacity = 0.08;
const focusOpacity = 0.12;
const activatedOpacity = 0.12;
const disabledOpacity = 0.38;

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
  disabled: alpha(stateColor, 0.12),
  disabledOpacity: String(disabledOpacity),
  hoverPrimary: alpha(primaryColor, hoverOpacity),
  focusPrimary: alpha(primaryColor, focusOpacity),
  selectedPrimary: alpha(primaryColor, 0.12),
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
    onPrimary: keyColors.primary[100],
    primaryContainer: keyColors.primary[95],
    onPrimaryContainer: keyColors.primary[10],
  },
  surface: {
    surface: neutralTones[100],
    surfaceContainer: neutralTones[99],
    surfaceContainerHigh: neutralTones[96],
    surfaceContainerHighest: neutralTones[90],
    onSurface: alpha(neutralTones[0], 0.87),
    onSurfaceVariant: alpha(neutralTones[0], 0.54),
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
    icon: neutralTones[50],
  },
  states: createStatesPalette(neutralTones[0], primaryColor),
};

export const darkPalette = {
  primary: {
    primary: keyColors.primary[80],
    onPrimary: keyColors.primary[10],
    primaryContainer: keyColors.primary[30],
    onPrimaryContainer: keyColors.primary[95],
  },
  surface: {
    surface: neutralTones[12],
    surfaceContainer: neutralTones[15],
    surfaceContainerHigh: neutralTones[18],
    surfaceContainerHighest: neutralTones[22],
    onSurface: alpha(neutralTones[100], 0.87),
    onSurfaceVariant: alpha(neutralTones[100], 0.5),
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
    icon: neutralTones[40],
  },
  states: createStatesPalette(neutralTones[100], keyColors.primary[80]),
} satisfies typeof lightPalette;
