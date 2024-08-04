import { defineProject } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineProject({
  test: {
    environment: "node",
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [tsconfigPaths() as any],
});
