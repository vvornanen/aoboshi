import { FunctionComponent } from "react";
import { Button, ButtonProps } from "@mui/base/Button";
import { clsx } from "clsx";
import { characterButton } from "./CharacterButton.css";

type CharacterButtonProps = ButtonProps & {
  highlight?: boolean;
  seen?: boolean;
  selected?: boolean;
};

export const CharacterButton: FunctionComponent<CharacterButtonProps> = ({
  highlight,
  seen,
  selected,
  className,
  ...props
}) => {
  return (
    <Button
      className={clsx(characterButton, className, {
        unseen: !seen,
        highlight,
        selected,
      })}
      {...props}
    />
  );
};
