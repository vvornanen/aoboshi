import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

const jobsDir = "src/jobs";
const migrationsDir = "src/migrations";

const jobs = fs.readdirSync(jobsDir).filter((file) => {
  const parsedPath = path.parse(file);
  return parsedPath.ext === ".ts";
});

const migrations = fs.readdirSync(migrationsDir).filter((file) => {
  const parsedPath = path.parse(file);
  return parsedPath.ext === ".ts" && parsedPath.name.match(/^\d{2}-/);
});

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["better-sqlite3"],
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
});
