import { join } from "node:path";
import { defineProject } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

export default defineProject({
  plugins: [tsconfigPaths()],
  test: {
    name: "app",
    projects: [
      {
        test: {
          name: { label: "main", color: "cyan" },
          environment: "node",
          include: ["src/{main,worker}/**/*.test.ts"],
        },
      },
      {
        plugins: [vanillaExtractPlugin()],
        test: {
          name: { label: "renderer", color: "cyan" },
          browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          include: ["src/renderer/**/*.test.{ts,tsx}"],
        },
      },
      {
        plugins: [
          vanillaExtractPlugin(),
          storybookTest({
            configDir: join(import.meta.dirname, ".storybook"),
            storybookScript: "pnpm storybook",
          }),
        ],
        optimizeDeps: {
          include: ["@vanilla-extract/recipes/createRuntimeFn"],
        },
        test: {
          name: { label: "storybook", color: "magenta" },
          browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
