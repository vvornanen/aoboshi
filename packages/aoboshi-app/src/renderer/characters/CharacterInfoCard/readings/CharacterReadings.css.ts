import { style } from "@vanilla-extract/css";
import { typographyVariant } from "~common/Typography/Typography.css";

export const characterReadings = style([
  typographyVariant({ variant: "bodyMedium" }),
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    height: "100%",
    overflow: "hidden",
  },
]);

export const readingsContainer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: 8,
});

export const reading = style({ whiteSpace: "nowrap" });
