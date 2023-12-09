import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { GradeFigure } from "./GradeFigure";
import { figures, figure, references } from "./figures.css";

type CharacterFiguresProps = {
  character: Character;
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
      >
        <GradeFigure character={character} />
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
        className={references}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "start",
          alignSelf: "end",
        }}
        aria-label={t("CharacterInfoCard.referenceLabel")}
      >
        {character.references.map((reference) => (
          <span key={reference.chapterId}>{reference.chapterCode}</span>
        ))}
      </div>
    </div>
  );
};
