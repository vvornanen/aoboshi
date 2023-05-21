import { styled } from "@mui/material";

/**
 * Highlights figures of characters within study scope.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const CircledFigure = styled("span")(({ theme }) => ({
  display: "inline-block",
  height: 20,
  borderRadius: 14,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.text.primary,
  paddingLeft: 6,
  paddingRight: 6,
  marginLeft: -6,
  marginRight: -6,
}));
