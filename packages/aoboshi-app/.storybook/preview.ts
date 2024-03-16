import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import { withStoreProvider } from "../src/storybook/storeProvider.decorator";
import {
  darkThemeClass,
  lightThemeClass,
} from "../src/renderer/theme/theme.css";
import "../src/renderer/styles.css";
import { IPC_API_KEY, IpcApi } from "../src/preload/IpcApi";
import { options } from "../src/i18n";

use(initReactI18next).init(options);

window[IPC_API_KEY] = {
  onToggleSidebar: () => {},
  toggleSidebar: () => {},
  onNavigate: () => {},
} satisfies IpcApi;

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
  ],
};

export default preview;
