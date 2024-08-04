import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import * as styles from "./CharacterButton.css";

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
      className={clsx(
        className,
        styles.characterButton({
          seen,
          highlight,
          selected,
          disabled,
        }),
      )}
      disabled={disabled}
      {...props}
    />
  );
};
