import "./i18n";
import { useEffect } from "react";
import { darkThemeClass, lightThemeClass } from "./theme/theme.css";
import { useMediaQuery } from "./useMediaQuery";

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeClass = prefersDarkMode ? darkThemeClass : lightThemeClass;

  useEffect(() => {
    document.documentElement.className = themeClass;
  }, [prefersDarkMode, themeClass]);

  return <div></div>;
};
