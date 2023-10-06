import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CharacterButton } from "../CharacterButton/CharacterButton";
import { CharacterStatus } from "./CharacterStatus";

type CharactersCardProps = {
  characters: CharacterStatus[];
};

export const CharactersCard: FC<CharactersCardProps> = ({ characters }) => {
  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "start",
          gap: 1,
        }}
      >
        {characters.map((character) => (
          <CharacterButton
            key={character.literal}
            literal={character.literal}
            seen={character.seen}
            highlight={character.highlight}
          />
        ))}
      </CardContent>
    </Card>
  );
};
