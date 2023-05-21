import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Character } from "../Character";
import { JlptLevelFigure } from "./JlptLevelFigure";
import { GradeFigure } from "./GradeFigure";

type CharacterFiguresProps = {
  character: Character;
};

/**
 * Displays information about the given character, including stroke count
 * and references.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CharacterFigures: FC<CharacterFiguresProps> = ({ character }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        height: "100%",
      }}
    >
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "start",
          alignSelf: "start",
          whiteSpace: "nowrap",
        }}
      >
        <Typography
          variant="body2"
          aria-label={t("CharacterInfoCard.referenceLabel")}
        >
          {Object.values(character.references)[0]}
        </Typography>
      </Box>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "end",
          alignSelf: "start",
          whiteSpace: "nowrap",
        }}
      >
        {character.strokeCount > 0 && (
          <Typography
            variant="body2"
            aria-label={t("CharacterInfoCard.strokeCountLabel")}
          >
            {t("CharacterInfoCard.strokeCount", {
              strokeCount: character.strokeCount,
            })}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "start",
          alignSelf: "end",
          whiteSpace: "nowrap",
        }}
      >
        <Typography variant="body2">
          <JlptLevelFigure character={character} />
        </Typography>
      </Box>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "end",
          alignSelf: "end",
          whiteSpace: "nowrap",
        }}
      >
        <Typography variant="body2">
          <GradeFigure character={character} />
        </Typography>
      </Box>
    </Box>
  );
};
