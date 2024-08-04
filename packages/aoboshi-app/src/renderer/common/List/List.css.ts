import { style } from "@vanilla-extract/css";
import { commonLayer } from "~/renderer/layers.css";

export const list = style(
  commonLayer({
    listStyle: "none",
    paddingInlineStart: 0,
  }),
);
