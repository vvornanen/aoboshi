import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { characterButton } from "./CharacterButton.css";

type CharacterButtonProps = ComponentPropsWithoutRef<"button"> & {
  highlight?: boolean;
  seen?: boolean;
  selected?: boolean;
};

export const CharacterButton: FunctionComponent<CharacterButtonProps> = ({
  highlight,
  seen,
  selected,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(characterButton, className, {
        unseen: !seen,
        highlight,
        selected,
        disabled,
      })}
      disabled={disabled}
      {...props}
    />
  );
};
