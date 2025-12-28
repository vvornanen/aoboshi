import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/renderer/**/*.mdx",
    "../src/renderer/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "vite.storybook.config.ts",
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
};
export default config;

function getAbsolutePath(packageName: string): string {
  return dirname(
    fileURLToPath(import.meta.resolve(join(packageName, "package.json"))),
  );
}
