import { defineProject } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  plugins: [vanillaExtractPlugin(), tsconfigPaths()],
  test: {
    environment: "jsdom",
  },
});
