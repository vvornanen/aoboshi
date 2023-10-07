import { FC, MouseEventHandler, useRef, useState } from "react";
import { Button } from "@mui/base/Button";
import { Popup } from "@mui/base/Unstable_Popup/Popup";
import { ClickAwayListener } from "@mui/base";
import { clsx } from "clsx";
import { CharacterInfoCard } from "../CharacterInfoCard/CharacterInfoCard";
import { useCharacterInfo } from "../CharacterInfoCard/useCharacterInfo";
import { characterButton, popupContent } from "./CharacterButton.css";

type CharacterButtonProps = {
  literal: string;
  highlight?: boolean;
  seen?: boolean;
};

export const CharacterButton: FC<CharacterButtonProps> = ({
  literal,
  highlight,
  seen,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { data } = useCharacterInfo(literal);

  const handleClick: MouseEventHandler = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleClick}
        className={clsx(characterButton, {
          unseen: !seen,
          highlight,
          selected: popoverOpen,
        })}
      >
        {literal}
      </Button>
      <ClickAwayListener onClickAway={handleClose}>
        <Popup
          anchor={buttonRef.current}
          open={popoverOpen}
          placement="bottom-start"
        >
          <CharacterInfoCard character={data} className={popupContent} />
        </Popup>
      </ClickAwayListener>
    </>
  );
};
