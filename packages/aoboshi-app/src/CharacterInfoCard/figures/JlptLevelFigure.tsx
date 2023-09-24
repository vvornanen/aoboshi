import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CharacterInfo, JLPT } from "../CharacterInfo";
import { CircledFigure } from "./CircledFigure";

type JlptFigureProps = {
  character: CharacterInfo;
};

/**
 * Displays the JLPT level of a character.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const JlptLevelFigure: FC<JlptFigureProps> = ({ character }) => {
  const { t } = useTranslation();

  const props = {
    "aria-label": t("CharacterInfoCard.jlptLabel"),
  };

  if (!character.literal) {
    return null;
  } else if (character.jlpt === null) {
    return <span {...props}>{t("CharacterInfoCard.noJLPT")}</span>;
  } else if (character.jlpt === JLPT.N1) {
    return <span {...props}>{character.jlpt}</span>;
  } else {
    return <CircledFigure {...props}>{character.jlpt}</CircledFigure>;
  }
};
