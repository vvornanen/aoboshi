import { defineProject } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";

export default defineProject({
  plugins: [tsconfigPaths()],
  test: {
    name: "anki",
    projects: [
      {
        test: {
          name: { label: "unit", color: "blue" },
          environment: "node",
          include: ["src/**/*.test.ts"],
        },
      },
      {
        test: {
          name: { label: "integration", color: "blue" },
          environment: "node",
          include: ["tests/integration.test.ts"],
          env: loadEnv("", process.cwd(), ""),
        },
      },
    ],
  },
});
