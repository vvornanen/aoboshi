import { FunctionComponent, MouseEvent, useRef, useState } from "react";
import { ClickAwayListener } from "@mui/base";
import { Popup } from "@mui/base/Unstable_Popup/Popup";
import { CharacterButton } from "../CharacterButton/CharacterButton";
import { Card } from "../../common/Card/Card";
import { CharacterInfoCard } from "../CharacterInfoCard/CharacterInfoCard";
import { useFindCharacterByLiteralQuery } from "../charactersApi";
import { Typography } from "../../common/Typography/Typography";
import { CharacterStatus } from "./CharacterStatus";
import { charactersCard } from "./CharactersCard.css";

type CharactersCardProps = {
  characters: CharacterStatus[];
};

export const CharactersCard: FunctionComponent<CharactersCardProps> = ({
  characters,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );
  const popoverAnchorRef = useRef<HTMLButtonElement | null>(null);
  const { data, error } = useFindCharacterByLiteralQuery(
    selectedCharacter || "",
    {
      skip: !selectedCharacter,
    },
  );
  const popoverOpen = selectedCharacter !== null;

  const handleClick = (
    literal: string,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedCharacter(literal);
    popoverAnchorRef.current = event.currentTarget;
  };

  const handleClose = () => {
    setSelectedCharacter(null);
    popoverAnchorRef.current = null;
  };

  return (
    <Card className={charactersCard}>
      {characters.map((character) => (
        <CharacterButton
          key={character.literal}
          seen={character.seen}
          highlight={character.highlight}
          selected={character.literal === selectedCharacter}
          onClick={(event) => handleClick(character.literal, event)}
        >
          {character.literal}
        </CharacterButton>
      ))}
      {popoverOpen && (
        <ClickAwayListener onClickAway={handleClose}>
          <Popup
            anchor={popoverAnchorRef.current}
            open={popoverOpen}
            placement="bottom-start"
          >
            <Card variant="raised">
              {data && (
                <CharacterInfoCard key={selectedCharacter} character={data} />
              )}
              {/* TODO: Error component */}
              {error && <Typography>{String(error)}</Typography>}
            </Card>
          </Popup>
        </ClickAwayListener>
      )}
    </Card>
  );
};
