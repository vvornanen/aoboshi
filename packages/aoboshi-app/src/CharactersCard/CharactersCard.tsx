import { FunctionComponent } from "react";
import { CharacterButton } from "../CharacterButton/CharacterButton";
import { Card } from "../Card/Card";
import { CharacterStatus } from "./CharacterStatus";
import { charactersCard } from "./CharactersCard.css";

type CharactersCardProps = {
  characters: CharacterStatus[];
};

export const CharactersCard: FunctionComponent<CharactersCardProps> = ({
  characters,
}) => {
  return (
    <Card className={charactersCard}>
      {characters.map((character) => (
        <CharacterButton
          key={character.literal}
          literal={character.literal}
          seen={character.seen}
          highlight={character.highlight}
        />
      ))}
    </Card>
  );
};
