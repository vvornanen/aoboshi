import { FC } from "react";
import { CharacterButton } from "../CharacterButton/CharacterButton";
import { CharacterStatus } from "./CharacterStatus";
import { charactersCard } from "./CharactersCard.css";

type CharactersCardProps = {
  characters: CharacterStatus[];
};

export const CharactersCard: FC<CharactersCardProps> = ({ characters }) => {
  return (
    <div className={charactersCard}>
      {characters.map((character) => (
        <CharacterButton
          key={character.literal}
          literal={character.literal}
          seen={character.seen}
          highlight={character.highlight}
        />
      ))}
    </div>
  );
};
