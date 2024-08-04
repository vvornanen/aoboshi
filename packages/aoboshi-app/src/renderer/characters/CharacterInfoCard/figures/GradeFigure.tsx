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
        <span className={styles.circledFigure}>
          {t("CharacterInfoCard.grade.kyoiku")}
        </span>
      </Tooltip>
    );
  } else if (character.grade === Grade.Joyo) {
    return (
      <Tooltip title={t("CharacterInfoCard.grade.joyouTooltip")}>
        <span>{t("CharacterInfoCard.grade.joyou")}</span>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={t("CharacterInfoCard.grade.jinmeiyoTooltip")}>
        <span>{t("CharacterInfoCard.grade.jinmeiyo")}</span>
      </Tooltip>
    );
  }
};
