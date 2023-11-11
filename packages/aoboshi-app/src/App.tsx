import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { darkThemeClass, lightThemeClass } from "./theme/theme.css";
import { useMediaQuery } from "./useMediaQuery";
import { Layout } from "./Layout/Layout";
import "./i18n";

export const App = () => {
  const { i18n } = useTranslation();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeClass = prefersDarkMode ? darkThemeClass : lightThemeClass;

  useEffect(() => {
    document.documentElement.className = themeClass;
  }, [prefersDarkMode, themeClass]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  return <Layout />;
};
