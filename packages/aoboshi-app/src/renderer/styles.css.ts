import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

// CSS reset based on https://www.joshwcomeau.com/css/custom-css-reset/
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
});

globalStyle("body", {
  lineHeight: 1.5,
  backgroundColor: vars.color.surface,
  color: vars.color.onSurface,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("p, h1, h2, h3, h4, h5, h6", {
  overflowWrap: "break-word",
});

globalStyle("#root", {
  isolation: "isolate",
});

export const windowControlsHeight = createVar();
export const windowControlsWidth = createVar();

globalStyle("html", {
  vars: {
    [windowControlsHeight]: "52px",
    [windowControlsWidth]: "90px",
  },
});

/** Visually hidden content for screen reader */
export const visuallyHidden = style({
  border: 0,
  clipPath: "inset(100%)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const drag = style({
  WebkitAppRegion: "drag",
});

export const noDrag = style({
  WebkitAppRegion: "no-drag",
});
