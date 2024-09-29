import { style } from "@vanilla-extract/css";

export const charactersCard = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
  justifyContent: "space-between",
  gap: 4,
});

export const gridCell = style({
  aspectRatio: "1 / 1",
  display: "grid",
  placeContent: "center",
});
