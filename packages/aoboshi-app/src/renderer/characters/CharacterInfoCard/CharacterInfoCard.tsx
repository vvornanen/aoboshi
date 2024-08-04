import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Character } from "@vvornanen/aoboshi-core/characters";
import * as styles from "./CharacterInfoCard.css";
import {
  CharacterFigures,
  CharacterReadings,
  CharacterStrokes,
  CharacterType,
} from ".";
import * as typographyStyles from "~common/Typography/Typography.css";

type CharacterInfoCardProps = ComponentPropsWithoutRef<"div"> & {
  character: Character;
  size?: number;
  loading?: boolean;
};

/**
 * Displays facts, readings and strokes for the given character.
 */
export const CharacterInfoCard: FunctionComponent<CharacterInfoCardProps> = ({
  character,
  size = 22,
  loading = false,
  ...props
}) => {
  const { t } = useTranslation();
  const columns = 28;

  return (
    <div
      role="region"
      aria-label={character.literal}
      aria-busy={loading}
      {...props}
    >
      <div className={typographyStyles.labelSmall}>
        {t("CharacterInfoCard.caption")}
      </div>
      <div
        className={styles.infoBoxContainer}
        style={{
          gridTemplateColumns: `repeat(${columns}, ${size}px)`,
          gridAutoRows: size,
          width: columns * size,
        }}
      >
        <div
          className={styles.infoBox}
          aria-label={t("CharacterInfoCard.printTypeLabel")}
          style={{
            gridColumnStart: 1,
            gridColumnEnd: 4,
            gridRow: "span 3",
            padding: 8,
          }}
        >
          <CharacterType literal={character.literal} variant="print" />
        </div>
        <div
          className={styles.infoBox}
          aria-label={t("CharacterInfoCard.textbookTypeLabel")}
          style={{
            gridColumnStart: 4,
            gridColumnEnd: 7,
            gridRow: "span 3",
            padding: 8,
          }}
        >
          <CharacterType literal={character.literal} variant="textbook" />
        </div>
        <div
          className={styles.infoBox}
          style={{
            gridColumnStart: 7,
            gridColumnEnd: 13,
            gridRow: "span 3",
            padding: "8px 16px",
          }}
        >
          <CharacterFigures character={character} loading={loading} />
        </div>
        <div
          className={styles.infoBox}
          style={{
            gridColumnStart: 13,
            gridColumnEnd: 29,
            gridRow: "span 3",
            padding: "0 8px",
          }}
        >
          <CharacterReadings
            onyomi={character.onyomi}
            kunyomi={character.kunyomi}
            max={10}
            loading={loading}
          />
        </div>
        <CharacterStrokes
          character={character}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};
