import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import { withStoreProvider } from "../src/storybook/storeProvider.decorator";
import { withIpcApi } from "../src/storybook/ipcApi.decorator";
import {
  darkThemeClass,
  lightThemeClass,
} from "../src/renderer/theme/theme.css";
import "../src/renderer/styles.css";
import { options } from "../src/i18n";

use(initReactI18next).init(options);

const preview: Preview = {
  parameters: {
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
    withStoreProvider,
    withIpcApi,
  ],
};

export default preview;
