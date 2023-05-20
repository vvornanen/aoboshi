import { FC } from "react";
import { useTheme } from "@mui/material";

type CharacterTypeProps = {
  /**
   * A single character to display. Displays only the first character if more
   * than one is given.
   */
  literal: string;

  fontFamily?: string;
};

/**
 * Displays a big character type in the given font.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CharacterType: FC<CharacterTypeProps> = ({
  literal,
  fontFamily,
}) => {
  const theme = useTheme();

  return (
    <svg viewBox="0 0 64 64">
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={theme.palette.text.primary}
        fontSize={64}
        fontFamily={fontFamily}
      >
        {literal.charAt(0)}
      </text>
    </svg>
  );
};
