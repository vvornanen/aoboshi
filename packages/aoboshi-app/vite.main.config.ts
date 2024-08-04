import fs from "node:fs";
import path from "node:path";
import { ConfigEnv, defineConfig, mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  getBuildConfig,
  getBuildDefine,
  external,
  hotRestartPlugin,
} from "./vite.base.config";

const jobsDir = "src/jobs";
const migrationsDir = "src/migrations";

const isTypescript = (file: string) => {
  const parsedPath = path.parse(file);
  return parsedPath.ext === ".ts";
};

const jobs = fs.readdirSync(jobsDir).filter(isTypescript);
const migrations = fs.readdirSync(migrationsDir).filter(isTypescript);

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"build">;
  const { forgeConfigSelf } = forgeEnv;
  const define = getBuildDefine(forgeEnv);
  const config = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry,
        fileName: () => "[name].js",
        formats: ["cjs"],
      },
      rollupOptions: {
        external: [...external, "better-sqlite3"],
        input: {
          main: "src/main/main.ts",
          ...Object.fromEntries(
            jobs.map((file) => [
              `jobs/${path.parse(file).name}`,
              path.join(jobsDir, file),
            ]),
          ),
          ...Object.fromEntries(
            migrations.map((file) => [
              `migrations/${path.parse(file).name}`,
              path.join(migrationsDir, file),
            ]),
          ),
        },
      },
    },
    plugins: [tsconfigPaths(), hotRestartPlugin("restart")],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
  };

  return mergeConfig(getBuildConfig(forgeEnv), config);
});
