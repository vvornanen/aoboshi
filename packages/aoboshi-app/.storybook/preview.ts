import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { darkTheme, lightTheme } from "../src/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../src/i18n";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;
