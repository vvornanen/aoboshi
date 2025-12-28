import { defineProject } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  plugins: [tsconfigPaths()],
  test: {
    name: "anki/unit",
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
