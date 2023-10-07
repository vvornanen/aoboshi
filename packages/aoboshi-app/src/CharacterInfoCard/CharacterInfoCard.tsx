import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { labelSmall } from "../Typography/Typography.css";
import { CharacterInfo } from "./CharacterInfo";
import { CharacterType } from "./CharacterType";
import { CharacterFigures } from "./figures/CharacterFigures";
import { CharacterReadings } from "./readings/CharacterReadings";
import { CharacterStrokes } from "./strokes/CharacterStrokes";
import { infoBox, infoBoxContainer } from "./CharacterInfoCard.css";

type CharacterInfoCardProps = ComponentPropsWithoutRef<"div"> & {
  character: CharacterInfo;
  size?: number;
};

/**
 * Displays facts, readings and strokes for the given character.
 */
export const CharacterInfoCard: FunctionComponent<CharacterInfoCardProps> = ({
  character,
  size = 22,
  ...props
}) => {
  const { t } = useTranslation();
  const columns = 28;

  return (
    <div role="region" aria-label={character.literal} {...props}>
      <div className={labelSmall}>{t("CharacterInfoCard.caption")}</div>
      <div
        className={infoBoxContainer}
        style={{
          gridTemplateColumns: `repeat(${columns}, ${size}px)`,
          gridAutoRows: size,
          width: columns * size,
        }}
      >
        <div
          className={infoBox}
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
          className={infoBox}
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
          className={infoBox}
          style={{
            gridColumnStart: 7,
            gridColumnEnd: 13,
            gridRow: "span 3",
            padding: "8px 16px",
          }}
        >
          <CharacterFigures character={character} />
        </div>
        <div
          className={infoBox}
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
          />
        </div>
        <CharacterStrokes character={character} columns={columns} />
      </div>
    </div>
  );
};
