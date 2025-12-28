import { defineProject } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import { playwright } from "@vitest/browser-playwright";

export default defineProject({
  plugins: [vanillaExtractPlugin(), tsconfigPaths()],
  test: {
    name: { label: "app/renderer", color: "cyan" },
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    include: ["src/renderer/**/*.test.{ts,tsx}"],
  },
});
