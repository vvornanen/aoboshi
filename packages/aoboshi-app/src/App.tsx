import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import "./i18n";
import { darkThemeClass, lightThemeClass } from "./theme/theme.css";

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const themeClass = darkMode ? darkThemeClass : lightThemeClass;

  return <div className={themeClass}></div>;
};
