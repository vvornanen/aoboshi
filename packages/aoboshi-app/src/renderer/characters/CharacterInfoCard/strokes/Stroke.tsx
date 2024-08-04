import { FunctionComponent, useEffect, useRef } from "react";
import { KanjiVG } from "./KanjiVG";
import * as styles from "./Stroke.css";

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
export const Stroke: FunctionComponent<StrokeProps> = ({ literal, svg, n }) => {
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

  return (
    <svg className={styles.strokeContainer} ref={ref} viewBox="0 0 100 100" />
  );
};
