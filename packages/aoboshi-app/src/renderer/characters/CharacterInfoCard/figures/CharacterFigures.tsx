import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Character } from "@vvornanen/aoboshi-core/characters";
import * as styles from "./figures.css";
import { Skeleton } from "~common/Skeleton";
import { maru } from "~common";
import { GradeFigure } from "~characters/CharacterInfoCard";

type CharacterFiguresProps = {
  character: Character;
  loading?: boolean;
};

/**
 * Displays information about the given character, including stroke count
 * and references.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CharacterFigures: FunctionComponent<CharacterFiguresProps> = ({
  character,
  loading = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.figures}>
      <div
        className={styles.figure}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "start",
          alignSelf: "start",
        }}
      >
        {!loading && <GradeFigure character={character} />}
        {loading && <Skeleton length={2} />}
      </div>
      <div
        className={styles.figure}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "end",
          alignSelf: "start",
        }}
        aria-label={t("CharacterInfoCard.strokeCountLabel")}
      >
        {!loading &&
          character.strokeCount > 0 &&
          t("CharacterInfoCard.strokeCount", {
            strokeCount: character.strokeCount,
          })}
        {loading && <Skeleton>0{maru()}</Skeleton>}
      </div>
      <div
        className={styles.references}
        style={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "start",
          alignSelf: "end",
        }}
        aria-label={t("CharacterInfoCard.referenceLabel")}
      >
        {!loading &&
          character.references.map((reference) => (
            <span key={reference.chapterId}>{reference.chapterCode}</span>
          ))}
        {loading && (
          <>
            <Skeleton length={3} />
          </>
        )}
      </div>
    </div>
  );
};
