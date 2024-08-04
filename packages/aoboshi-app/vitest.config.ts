import { defineProject } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [vanillaExtractPlugin() as any, tsconfigPaths() as any],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", "out/**"],
  },
});
