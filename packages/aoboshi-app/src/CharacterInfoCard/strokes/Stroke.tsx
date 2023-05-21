import { FC, useEffect, useRef } from "react";
import { styled } from "@mui/material";
import { KanjiVG } from "./KanjiVG";

const Svg = styled("svg")(({ theme }) => ({
  ".hidden-stroke": {
    visibility: "hidden",
  },
  ".stroke": {
    visibility: "visible",
    strokeWidth: "4px",
    stroke:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
  },
  ".current-stroke": {
    stroke: theme.palette.text.primary,
  },
  "@keyframes stroke": {
    to: {
      strokeDashoffset: 0,
    },
  },
  ":hover .current-stroke": {
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
    animation: "stroke 5s ease-in-out forwards",
  },
}));

type StrokeProps = {
  literal: string;
  svg: string;
  n: number;
};

/**
 * Displays a single stroke of a character.
 *
 * Current stroke is highlighted, following strokes are hidden.
 * Animates the current stroke on hover.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const Stroke: FC<StrokeProps> = ({ literal, svg, n }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const kanji = KanjiVG.fromString(literal, svg);

    if (!ref.current || !kanji) {
      return;
    }

    ref.current.innerHTML = "";
    kanji.appendTo(ref.current);
    kanji.fitParent();
    kanji.removeStrokeNumbers();
    kanji.showStroke(n);
  }, [literal, svg, n]);

  return <Svg ref={ref} viewBox="0 0 100 100" />;
};
