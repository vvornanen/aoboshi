import { style } from "@vanilla-extract/css";
import { commonLayer } from "~/renderer/layers.css";

/** Visually hidden content for screen reader */
export const visuallyHidden = style(
  commonLayer({
    border: 0,
    clipPath: "inset(100%)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  }),
);
