import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  characterReadings,
  readingsContainer,
  reading,
} from "./CharacterReadings.css";
import { formatReading } from "~characters/CharacterInfoCard";
import { Skeleton } from "~common/Skeleton";

type CharacterReadingsProps = {
  onyomi: string[];
  kunyomi: string[];
  max?: number;
  loading?: boolean;
};

/**
 * Displays all readings of a character.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CharacterReadings: FunctionComponent<CharacterReadingsProps> = ({
  onyomi,
  kunyomi,
  max,
  loading = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className={characterReadings}>
      <div
        className={readingsContainer}
        aria-label={t("CharacterInfoCard.onyomiLabel")}
      >
        {!loading &&
          onyomi.slice(0, max).map((value) => (
            <span className={reading} key={value}>
              {formatReading(value)}
            </span>
          ))}
        {loading && (
          <span className={reading}>
            <Skeleton length={8} />
          </span>
        )}
      </div>
      <div
        className={readingsContainer}
        aria-label={t("CharacterInfoCard.kunyomiLabel")}
      >
        {!loading &&
          kunyomi.slice(0, max).map((value) => (
            <span className={reading} key={value}>
              {formatReading(value)}
            </span>
          ))}
        {loading && (
          <span className={reading}>
            <Skeleton length={12} />
          </span>
        )}
      </div>
    </div>
  );
};
