import { FunctionComponent, ReactNode, useEffect } from "react";
import * as theme from "~theme/theme.css";
import { useMediaQuery } from "~common";

export type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeClass = prefersDarkMode
    ? theme.darkThemeClass
    : theme.lightThemeClass;

  useEffect(() => {
    document.documentElement.className = themeClass;
  }, [prefersDarkMode, themeClass]);

  // For now just add the theme class to the document and return children as is,
  // but if needed, we could also provide the chosen theme in a context here.
  return children;
};
