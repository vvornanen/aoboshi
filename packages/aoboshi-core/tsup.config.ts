import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/books/index.ts",
    "src/collections/index.ts",
    "src/characters/index.ts",
    "src/fixtures/bookFixtures.ts",
    "src/fixtures/characterFixtures.ts",
    "src/fixtures/createCharacter.ts",
    "src/settings/index.ts",
    "src/statistics/index.ts",
    "src/statistics/chapter/index.ts",
    "src/statistics/character/index.ts",
    "src/statistics/day/index.ts",
    "src/statistics/statisticsFixtures.ts",
  ],
  format: ["esm"],
  target: "node20",
  clean: true,
  sourcemap: true,
  onSuccess: "tsc --project tsconfig.build.json",
});
