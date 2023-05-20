import { styled } from "@mui/material";

/**
 * Bordered box for all grid elements within {@link CharacterInfoCard}.
 */
export const InfoBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
}));
