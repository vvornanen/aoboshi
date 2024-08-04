import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/kanjidic/index.ts", "src/kanjivg/index.ts"],
  format: ["esm"],
  target: "node20",
  clean: true,
  sourcemap: true,
  onSuccess: "tsc --project tsconfig.build.json",
});
