import "./i18n";
import { clsx } from "clsx";
import { darkThemeClass, lightThemeClass } from "./theme/theme.css";
import { useMediaQuery } from "./useMediaQuery";
import { app } from "./App.css";

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeClass = prefersDarkMode ? darkThemeClass : lightThemeClass;

  return <div className={clsx(themeClass, app)}></div>;
};
