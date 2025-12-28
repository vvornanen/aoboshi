import type { Preview, ReactRenderer } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import i18next from "i18next";
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

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init(options);

const preview: Preview = {
  parameters: {
    a11y: {
      test: "error",
      options: {
        // See: https://www.deque.com/axe/core-documentation/api-documentation/#axe-core-tags
        runOnly: [
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
          "best-practice",
        ],
        rules: {
          // Disable region rule by default because it causes false negatives in component stories.
          // This rule may be enabled separately for page-level stories.
          region: { enabled: false },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      codePanel: true,
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
