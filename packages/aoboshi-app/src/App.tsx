import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { darkThemeClass, lightThemeClass } from "./theme/theme.css";
import { useMediaQuery } from "./useMediaQuery";
import "./i18n";
import { router } from "./routes";

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeClass = prefersDarkMode ? darkThemeClass : lightThemeClass;

  useEffect(() => {
    document.documentElement.className = themeClass;
  }, [prefersDarkMode, themeClass]);

  return <RouterProvider router={router} />;
};
