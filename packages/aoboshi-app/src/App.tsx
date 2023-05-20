import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme";
import "./i18n";

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  );
};
