import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { zIndex } from "~theme";
import { drag } from "~common/window.css";
import * as theme from "~theme/theme.css";

export const sidebarWidth = createVar();
export const toggleButtonWidth = createVar();

export const sidebarLayout = style({
  position: "relative",
});

export const sidebarContainer = recipe({
  base: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: `${theme.vars.windowControls.height} 1fr`,
    vars: {
      [toggleButtonWidth]: "28px",
    },
  },
  variants: {
    open: {
      true: {
        gridTemplateAreas: `
          "sidebar toolbar"
          "sidebar main"
          `,
        gridTemplateColumns: `${sidebarWidth} 1fr`,
        width: "100vw",
      },
      false: {
        gridTemplateAreas: `
          "sidebar window-controls toolbar"
          "sidebar main main"
          `,
        gridTemplateColumns: `${sidebarWidth} calc(${theme.vars.windowControls.width} + ${toggleButtonWidth}) 1fr`,
        width: `calc(100vw + ${sidebarWidth})`,
      },
    },
  },
});

export const dragRegion = style([
  drag,
  {
    position: "absolute",
    height: theme.vars.windowControls.height,
    width: "100%",
    zIndex: -1,
  },
]);

export const toggleButton = style({
  position: "absolute",
  left: theme.vars.windowControls.width,
  top: `calc(${theme.vars.windowControls.height} / 2 - 14px)`,
  zIndex: zIndex.drawer + 1,
});

export const sidebar = style({
  gridArea: "sidebar",
});

export const toolbar = style({
  gridArea: "toolbar",
});

export const main = style({
  gridArea: "main",
  overflowY: "auto",
});
