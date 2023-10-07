import { FC, useEffect, useRef } from "react";
import { KanjiVG } from "./KanjiVG";
import { strokeContainer } from "./Stroke.css";

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

  return <svg className={strokeContainer} ref={ref} viewBox="0 0 100 100" />;
};
