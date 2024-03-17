import { FunctionComponent, MouseEvent, useRef, useState } from "react";
import { ClickAwayListener } from "@mui/base";
import { Popup } from "@mui/base/Unstable_Popup/Popup";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { CharacterButton } from "../CharacterButton/CharacterButton";
import { Card } from "../../common/Card/Card";
import { CharacterInfoCard } from "../CharacterInfoCard/CharacterInfoCard";
import { useFindCharacterByLiteralQuery } from "../charactersApi";
import { Typography } from "../../common/Typography/Typography";
import { Skeleton } from "../../common/Skeleton/Skeleton";
import { CharacterStatus } from "./CharacterStatus";
import { charactersCard } from "./CharactersCard.css";

const emptyCharacter: Character = {
  literal: "",
  radical: null,
  grade: null,
  strokeCount: 0,
  references: [],
  onyomi: [],
  kunyomi: [],
};

type CharactersCardProps = {
  characters?: CharacterStatus[];
  loading?: boolean;
};

export const CharactersCard: FunctionComponent<CharactersCardProps> = ({
  characters = [],
  loading = false,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );
  const popoverAnchorRef = useRef<HTMLButtonElement | null>(null);
  const { data, error, isFetching } = useFindCharacterByLiteralQuery(
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
      {!loading &&
        characters.map((character) => (
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
      {loading && (
        <Skeleton
          variant="rounded"
          color="light"
          style={{
            width: "100%",
            height: 150,
          }}
        />
      )}
      {popoverOpen && (
        <ClickAwayListener onClickAway={handleClose}>
          <Popup
            anchor={popoverAnchorRef.current}
            open={popoverOpen}
            placement="bottom-start"
          >
            <Card variant="raised">
              {!error && (
                <CharacterInfoCard
                  key={selectedCharacter}
                  character={
                    data || { ...emptyCharacter, literal: selectedCharacter }
                  }
                  loading={isFetching}
                />
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
