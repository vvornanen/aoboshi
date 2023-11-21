import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import {
  darkThemeClass,
  lightThemeClass,
} from "../src/renderer/theme/theme.css";
import "../src/renderer/styles.css";
import "../src/i18n.renderer";
import { IPC_API_KEY, IpcApi } from "../src/main/IpcApi";

window[IPC_API_KEY] = {
  onToggleSidebar: () => {},
  toggleSidebar: () => {},
  onNavigate: () => {},
} satisfies IpcApi;

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
