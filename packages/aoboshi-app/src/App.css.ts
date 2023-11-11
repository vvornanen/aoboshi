import { style } from "@vanilla-extract/css";

export const drag = style({
  // Ignore ts error because vanilla-extract does not understand electron-specific style
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  "-webkit-app-region": "drag",
});

export const noDrag = style({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  "-webkit-app-region": "no-drag",
});
