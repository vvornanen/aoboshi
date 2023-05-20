import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StrokeBackground } from "./StrokeBackground";
import { Character } from "./Character";
import { InfoBox } from "./InfoBox";

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
export const CharacterStrokes: FC<CharacterStrokesProps> = ({
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
      {Array.from({ length: numberOfCells }, (x, i) => i + 1).map((i) => (
        <InfoBox
          key={i}
          role={i <= character.strokeCount ? "figure" : "presentation"}
          aria-label={
            i <= character.strokeCount
              ? t("CharacterInfoCard.strokeLabel", { stroke: i })
              : undefined
          }
          sx={{
            gridColumn: `span ${span}`,
            gridRow: `span ${span}`,
          }}
        >
          <StrokeBackground />
        </InfoBox>
      ))}
    </>
  );
};
