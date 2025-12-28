import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: ["**/index.ts", "**/*.css.ts"],
    },
    projects: ["packages/*/vitest?(.*).config.ts"],
  },
});
