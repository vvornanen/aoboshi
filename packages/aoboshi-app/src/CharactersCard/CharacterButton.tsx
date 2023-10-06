import { FC, MouseEventHandler, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ButtonBase, { buttonBaseClasses } from "@mui/material/ButtonBase";
import { alpha } from "@mui/material";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { CharacterInfoCard } from "../CharacterInfoCard/CharacterInfoCard";
import { useCharacterInfo } from "../CharacterInfoCard/useCharacterInfo";
import { CharacterStatus } from "./CharacterStatus";

type CharacterButtonProps = {
  character: CharacterStatus;
};

export const CharacterButton: FC<CharacterButtonProps> = ({ character }) => {
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { data } = useCharacterInfo(character.literal);

  const handleClick: MouseEventHandler = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

  return (
    <>
      <ButtonBase
        ref={buttonRef}
        onClick={handleClick}
        tabIndex={0}
        sx={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: theme.typography.textbook,
          fontWeight: 400,
          fontSize: "1.5rem",
          borderRadius: `${theme.shape.borderRadius}px`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
            ...(character.highlight && {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.hoverOpacity,
              ),
            }),
          },
          [`&.${buttonBaseClasses.focusVisible}`]: {
            backgroundColor: theme.palette.action.focus,
            ...(character.highlight && {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity,
              ),
            }),
          },
          ...(!character.seen && {
            color: alpha(theme.palette.text.primary, 0.1),
          }),
          ...(character.highlight && {
            opacity: 1,
            color: theme.palette.primary.main,
            outlineColor: theme.palette.primary.main,
            outlineWidth: 2,
            outlineStyle: "dashed",
            outlineOffset: -2,
          }),
          ...(popoverOpen && {
            backgroundColor: theme.palette.action.selected,
          }),
          ...(popoverOpen &&
            character.highlight && {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
              ),
            }),
        }}
      >
        {character.literal}
      </ButtonBase>
      <Popover
        anchorEl={buttonRef.current}
        open={popoverOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 1 }}>
          <CharacterInfoCard character={data} />
        </Box>
      </Popover>
    </>
  );
};
