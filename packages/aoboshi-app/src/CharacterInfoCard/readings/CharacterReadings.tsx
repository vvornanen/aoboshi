import { FC } from "react";
import { useTranslation } from "react-i18next";
import { formatReading } from "./formatReading";
import { characterReadings, readingsContainer } from "./CharacterReadings.css";

type CharacterReadingsProps = {
  onyomi: string[];
  kunyomi: string[];
  max?: number;
};

/**
 * Displays all readings of a character.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CharacterReadings: FC<CharacterReadingsProps> = ({
  onyomi,
  kunyomi,
  max,
}) => {
  const { t } = useTranslation();

  return (
    <div className={characterReadings}>
      <div
        className={readingsContainer}
        aria-label={t("CharacterInfoCard.onyomiLabel")}
      >
        {onyomi.slice(0, max).map((reading) => (
          <span className={reading} key={reading}>
            {formatReading(reading)}
          </span>
        ))}
      </div>
      <div
        className={readingsContainer}
        aria-label={t("CharacterInfoCard.kunyomiLabel")}
      >
        {kunyomi.slice(0, max).map((reading) => (
          <span className={reading} key={reading}>
            {formatReading(reading)}
          </span>
        ))}
      </div>
    </div>
  );
};
