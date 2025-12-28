import { defineProject } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  plugins: [tsconfigPaths()],
  test: {
    name: "anki/integration",
    environment: "node",
    include: ["tests/integration.test.ts"],
  },
});
