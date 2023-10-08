import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { CharacterInfo } from "../CharacterInfo";
import { JlptLevelFigure } from "./JlptLevelFigure";
import { GradeFigure } from "./GradeFigure";
import { figures, figure } from "./figures.css";

type CharacterFiguresProps = {
  character: CharacterInfo;
};

/**
 * Displays information about the given character, including stroke count
 * and references.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CharacterFigures: FunctionComponent<CharacterFiguresProps> = ({
  character,
}) => {
  const { t } = useTranslation();

  return (
    <div className={figures}>
      <div
        className={figure}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "start",
          alignSelf: "start",
        }}
        aria-label={t("CharacterInfoCard.referenceLabel")}
      >
        {Object.values(character.references)[0]}
      </div>
      <div
        className={figure}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "end",
          alignSelf: "start",
        }}
        aria-label={t("CharacterInfoCard.strokeCountLabel")}
      >
        {character.strokeCount > 0 &&
          t("CharacterInfoCard.strokeCount", {
            strokeCount: character.strokeCount,
          })}
      </div>
      <div
        className={figure}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "start",
          alignSelf: "end",
        }}
      >
        <JlptLevelFigure character={character} />
      </div>
      <div
        className={figure}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "end",
          alignSelf: "end",
        }}
      >
        <GradeFigure character={character} />
      </div>
    </div>
  );
};
