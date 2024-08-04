import { style } from "@vanilla-extract/css";
import { commonLayer } from "~/renderer/layers.css";

export const drag = style(
  commonLayer({
    WebkitAppRegion: "drag",
  }),
);
export const noDrag = style(
  commonLayer({
    WebkitAppRegion: "no-drag",
  }),
);
