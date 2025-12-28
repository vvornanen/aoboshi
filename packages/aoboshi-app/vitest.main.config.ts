import { defineProject } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  plugins: [tsconfigPaths()],
  test: {
    name: "app/main",
    environment: "node",
    include: ["src/{main,worker}/**/*.test.ts"],
  },
});
