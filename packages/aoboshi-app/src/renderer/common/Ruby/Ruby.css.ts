import { style } from "@vanilla-extract/css";
import { commonLayer } from "~/renderer/layers.css";

export const rubyText = style(
  commonLayer({
    fontSize: "inherit",
    zoom: "50%",
    userSelect: "none",
  }),
);
