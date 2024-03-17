import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { infoBox } from "../CharacterInfoCard.css";
import { StrokeBackground } from "./StrokeBackground";
import { Stroke } from "./Stroke";

type CharacterStrokesProps = {
  character: Character;

  /** Number of columns in the parent grid. */
  columns: number;
};

/**
 * Renders an array of boxes for all strokes of the given character.
 *
 * Subcomponent of {@link CharacterInfoCard}. Assumes it is rendered inside
 * a grid. Returns zero or more rows depending on the number of strokes,
 * and returns always full rows, padding the end of the last row with empty
 * boxes.
 */
export const CharacterStrokes: FunctionComponent<CharacterStrokesProps> = ({
  character,
  columns,
}) => {
  const { t } = useTranslation();

  const span = 2;
  const numberOfStrokesPerRow = columns / span;

  // Render only full rows
  const numberOfCells =
    Math.ceil(character.strokeCount / numberOfStrokesPerRow) *
    numberOfStrokesPerRow;

  return (
    <>
      {Array.from({ length: numberOfCells }, (x, i) => i + 1).map((n) => (
        <div
          className={infoBox}
          key={n}
          role={n <= character.strokeCount ? "figure" : "presentation"}
          aria-label={
            n <= character.strokeCount
              ? t("CharacterInfoCard.strokeLabel", { stroke: n })
              : undefined
          }
          style={{
            gridColumn: `span ${span}`,
            gridRow: `span ${span}`,
          }}
        >
          <StrokeBackground>
            {n <= character.strokeCount && (
              <Stroke
                literal={character.literal}
                svg={character.strokes || ""}
                n={n}
              />
            )}
          </StrokeBackground>
        </div>
      ))}
    </>
  );
};
