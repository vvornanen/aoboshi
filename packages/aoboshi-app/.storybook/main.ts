import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/renderer/**/*.mdx",
    "../src/renderer/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("storybook-addon-react-router-v6"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "vite.renderer.config.ts",
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}
