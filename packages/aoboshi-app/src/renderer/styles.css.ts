import { globalStyle } from "@vanilla-extract/css";
import * as theme from "~theme/theme.css";
import { resetLayer } from "~/renderer/layers.css";

// CSS reset based on https://www.joshwcomeau.com/css/custom-css-reset/
globalStyle(
  "*, *::before, *::after",
  resetLayer({
    boxSizing: "border-box",
  }),
);

globalStyle(
  "*",
  resetLayer({
    margin: 0,
  }),
);

globalStyle(
  "body",
  resetLayer({
    lineHeight: 1.5,
    backgroundColor: theme.vars.color.surface,
    color: theme.vars.color.onSurface,
    fontFamily: theme.vars.typography.fontFamily,
    fontSize: theme.vars.typography.fontSize,
  }),
);

globalStyle(
  "img, picture, video, canvas, svg",
  resetLayer({
    display: "block",
    maxWidth: "100%",
  }),
);

globalStyle(
  "input, button, textarea, select",
  resetLayer({
    font: "inherit",
  }),
);

globalStyle(
  "p, h1, h2, h3, h4, h5, h6",
  resetLayer({
    overflowWrap: "break-word",
  }),
);

globalStyle(
  "#root",
  resetLayer({
    isolation: "isolate",
  }),
);

globalStyle(
  ":focus-visible",
  resetLayer({
    outline: "none", // All focusable components define their own focus styles
  }),
);
