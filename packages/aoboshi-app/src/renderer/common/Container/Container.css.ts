import { style } from "@vanilla-extract/css";
import { commonLayer } from "~/renderer/layers.css";

export const container = style(
  commonLayer({
    paddingLeft: 16,
    paddingRight: 16,
  }),
);
