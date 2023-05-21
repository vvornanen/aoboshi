import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Character } from "./Character";
import { CharacterType } from "./CharacterType";
import { CharacterFigures } from "./figures/CharacterFigures";
import { CharacterReadings } from "./readings/CharacterReadings";
import { CharacterStrokes } from "./strokes/CharacterStrokes";
import { InfoBox } from "./InfoBox";

type CharacterInfoCardProps = {
  character: Character;
  size?: number;
};

/**
 * Displays facts, readings and strokes for the given character.
 */
export const CharacterInfoCard: FC<CharacterInfoCardProps> = ({
  character,
  size = 22,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const columns = 28;

  return (
    <Box role="region" aria-label={character.literal}>
      <Typography variant="caption">
        {t("CharacterInfoCard.caption")}
      </Typography>
      <InfoBox
        sx={{
          boxSizing: "content-box",
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: `repeat(${columns}, ${size}px)`,
          gridAutoRows: size,
          width: columns * size,
        }}
      >
        <InfoBox
          aria-label={t("CharacterInfoCard.printTypeLabel")}
          sx={{
            gridColumnStart: 1,
            gridColumnEnd: 4,
            gridRow: "span 3",
            padding: 1,
          }}
        >
          <CharacterType
            literal={character.literal}
            fontFamily={theme.typography.print.fontFamily}
          />
        </InfoBox>
        <InfoBox
          aria-label={t("CharacterInfoCard.textbookTypeLabel")}
          sx={{
            gridColumnStart: 4,
            gridColumnEnd: 7,
            gridRow: "span 3",
            padding: 1,
          }}
        >
          <CharacterType
            literal={character.literal}
            fontFamily={theme.typography.textbook.fontFamily}
          />
        </InfoBox>
        <InfoBox
          sx={{
            gridColumnStart: 7,
            gridColumnEnd: 13,
            gridRow: "span 3",
            paddingY: 1,
            paddingX: 2,
          }}
        >
          <CharacterFigures character={character} />
        </InfoBox>
        <InfoBox
          sx={{
            gridColumnStart: 13,
            gridColumnEnd: 29,
            gridRow: "span 3",
            paddingX: 1,
          }}
        >
          <CharacterReadings
            onyomi={character.onyomi}
            kunyomi={character.kunyomi}
            max={10}
          />
        </InfoBox>
        <CharacterStrokes character={character} columns={columns} />
      </InfoBox>
    </Box>
  );
};
