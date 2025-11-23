import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import {
  storeLoader,
  withFakeTimers,
  withIpcApi,
  withStoreProvider,
} from "~/storybook";
import { darkThemeClass, lightThemeClass } from "~/renderer/theme/theme.css";
import "~/renderer/styles.css";
import { options } from "~/i18n";
import { withReactRouter } from "~/storybook/reactRouter.decorator";

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
  loaders: [storeLoader],
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: lightThemeClass,
        dark: darkThemeClass,
      },
      defaultTheme: "light",
    }),
    withFakeTimers,
    withStoreProvider,
    withReactRouter,
    withIpcApi,
  ],
};

export default preview;
