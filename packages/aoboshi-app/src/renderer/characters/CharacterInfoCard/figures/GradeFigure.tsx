import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  Character,
  Grade,
  KANA_REGEXP,
} from "@vvornanen/aoboshi-core/characters";
import * as styles from "./figures.css";
import { Tooltip } from "~common/Tooltip";

type GradeFigureProps = {
  character: Character;
};

/**
 * Displays the grade of a character.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const GradeFigure: FunctionComponent<GradeFigureProps> = ({
  character,
}) => {
  const { t } = useTranslation();

  const props = {
    "aria-label": t("CharacterInfoCard.gradeLabel"),
  };

  if (!character.literal) {
    return null;
  } else if (character.literal.match(KANA_REGEXP)) {
    return <span {...props}>{t("CharacterInfoCard.grade.kana")}</span>;
  } else if (character.grade === null) {
    return <span {...props}>{t("CharacterInfoCard.grade.other")}</span>;
  } else if (character.grade <= Grade.Kyoiku6) {
    return (
      <Tooltip
        title={t("CharacterInfoCard.grade.kyoikuTooltip", {
          grade: character.grade,
        })}
      >
        <button className={styles.circledFigure}>
          {t("CharacterInfoCard.grade.kyoiku")}
        </button>
      </Tooltip>
    );
  } else if (character.grade === Grade.Joyo) {
    return (
      <Tooltip title={t("CharacterInfoCard.grade.joyouTooltip")}>
        <button className={styles.figure}>
          {t("CharacterInfoCard.grade.joyou")}
        </button>
      </Tooltip>
    );
  } else if (character.grade === Grade.Jinmeiyo) {
    return (
      <Tooltip title={t("CharacterInfoCard.grade.jinmeiyoTooltip")}>
        <button className={styles.figure}>
          {t("CharacterInfoCard.grade.jinmeiyo")}
        </button>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={t("CharacterInfoCard.grade.jinmeiyoVariantTooltip")}>
        <button className={styles.figure}>
          {t("CharacterInfoCard.grade.jinmeiyo")}
        </button>
      </Tooltip>
    );
  }
};
