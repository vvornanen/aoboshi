import { FC, ReactNode } from "react";
import { Box, SxProps, useTheme } from "@mui/material";

type StrokeBackgroundProps = {
  children?: ReactNode;
  sx?: SxProps;
};

/**
 * Wrap character strokes with this component to display a background grid
 * behind them.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const StrokeBackground: FC<StrokeBackgroundProps> = ({
  children,
  sx,
}) => {
  const theme = useTheme();
  const strokeColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.grey[400];

  const grid = (
    <svg viewBox="0 0 100 100">
      <line
        x1="0"
        y1="50"
        x2="100"
        y2="50"
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray="4 8"
      />
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="100"
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray="4 8"
      />
    </svg>
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        {grid}
      </Box>
      <Box sx={[{ position: "relative" }, ...(Array.isArray(sx) ? sx : [sx])]}>
        {children}
      </Box>
    </Box>
  );
};
