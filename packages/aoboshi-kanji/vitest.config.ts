import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    name: { label: "kanji", color: "yellow" },
    environment: "node",
  },
});
