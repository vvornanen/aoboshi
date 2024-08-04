import { FunctionComponent } from "react";
import { clsx } from "clsx";
import * as typographyStyles from "~common/Typography/Typography.css";

type CharacterTypeProps = {
  /**
   * A single character to display. Displays only the first character if more
   * than one is given.
   */
  literal: string;

  variant: "textbook" | "print";
};

/**
 * Displays a big character type in the given font.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CharacterType: FunctionComponent<CharacterTypeProps> = ({
  literal,
  variant,
}) => (
  <svg viewBox="0 0 64 64">
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill="currentColor"
      className={clsx({
        [typographyStyles.textbookDisplay]: variant === "textbook",
        [typographyStyles.printDisplay]: variant === "print",
      })}
    >
      {[...literal][0]}
    </text>
  </svg>
);
