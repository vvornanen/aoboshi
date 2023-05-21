import { FC } from "react";
import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatReading } from "./formatReading";

type CharacterReadingsProps = {
  onyomi: string[];
  kunyomi: string[];
  max?: number;
};

const ReadingsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: theme.spacing(1),
}));

const Reading = styled("span")(() => ({ whiteSpace: "nowrap" }));

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
    <Typography
      component="div"
      variant="body2"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <ReadingsContainer aria-label={t("CharacterInfoCard.onyomiLabel")}>
        {onyomi.slice(0, max).map((reading) => (
          <Reading key={reading}>{formatReading(reading)}</Reading>
        ))}
      </ReadingsContainer>
      <ReadingsContainer aria-label={t("CharacterInfoCard.kunyomiLabel")}>
        {kunyomi.slice(0, max).map((reading) => (
          <Reading key={reading}>{formatReading(reading)}</Reading>
        ))}
      </ReadingsContainer>
    </Typography>
  );
};
