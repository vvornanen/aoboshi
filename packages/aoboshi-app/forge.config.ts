import { exec as execCb } from "node:child_process";
import { promisify } from "node:util";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";

const exec = promisify(execCb);

const getAbsolutePath = (value: string) =>
  dirname(require.resolve(join(value, "package.json")));

export default {
  packagerConfig: {
    appBundleId: "com.github.vvornanen.aoboshi",
    appCopyright: "© 2023 Ville Vornanen",
    icon: "src/resources/aoboshi",
    extraResource: [
      "src/resources/ja.lproj",
      "src/resources/kanjidic2.xml.gz",
      "src/resources/kanjivg.xml.gz",
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
  ],
  hooks: {
    packageAfterCopy: async (_: unknown, buildPath: string) => {
      const files = readdirSync(buildPath);
      const include = [".vite", "node_modules", "package.json"];

      // Clean up all unnecessary source files from the package
      for (const file of files) {
        if (!include.includes(file)) {
          await exec(`rm -rf ${buildPath}/${file}`);
        }
      }
    },
    packageAfterPrune: async (_: unknown, buildPath: string) => {
      const nodeModulesDir = join(buildPath, "node_modules");

      await exec(`mkdir -p ${nodeModulesDir}`);

      // SQLite cannot be bundled with vite, so the package and its transitive dependencies must be copied manually
      const packages = ["better-sqlite3", "bindings", "file-uri-to-path"].map(
        getAbsolutePath,
      );

      await Promise.all(
        packages.map(async (packagePath) =>
          exec(`cp -r ${packagePath} ${nodeModulesDir}`),
        ),
      );
    },
  },
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: "src/main/main.ts",
            config: "vite.main.config.ts",
          },
          {
            entry: "src/preload/preload.ts",
            config: "vite.preload.config.ts",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.renderer.config.ts",
          },
        ],
      },
    },
  ],
};
