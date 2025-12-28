import { join } from "node:path";
import { defineProject } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  plugins: [
    vanillaExtractPlugin(),
    tsconfigPaths(),
    storybookTest({
      configDir: join(import.meta.dirname, ".storybook"),
      storybookScript: "yarn storybook",
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
