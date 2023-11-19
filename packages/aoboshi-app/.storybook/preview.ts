import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { darkThemeClass, lightThemeClass } from "../src/theme/theme.css";
import "../src/styles.css";
import "../src/i18n.renderer";

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
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: lightThemeClass,
        dark: darkThemeClass,
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
