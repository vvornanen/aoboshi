import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: [
        "**/index.ts",
        "**/*.css.ts",
        "**/@types/*.ts",
        "**/*.stories.tsx",
        "packages/aoboshi-anki/src/fixtures.ts",
        "packages/aoboshi-app/src/jobs/**",
        "packages/aoboshi-app/src/migrations/**",
        "packages/aoboshi-app/src/storybook/**",
        "packages/aoboshi-core/src/fixtures/**",
      ],
    },
    projects: ["packages/*/vitest?(.*).config.ts"],
    taskTitleValueFormatTruncate: 0, // Do not truncate test.each titles
  },
});
