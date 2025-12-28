import { defineProject } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  plugins: [tsconfigPaths()],
  test: {
    name: { label: "anki/integration", color: "blue" },
    environment: "node",
    include: ["tests/integration.test.ts"],
  },
});
