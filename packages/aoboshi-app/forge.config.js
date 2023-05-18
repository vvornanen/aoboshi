module.exports = {
  packagerConfig: {
    appBundleId: "com.github.vvornanen.aoboshi",
    appCopyright: "© 2023 Ville Vornanen",
    icon: "src/resources/aoboshi",
    extraResource: ["src/resources/ja.lproj"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: "src/main.ts",
            config: "vite.main.config.mjs",
          },
          {
            entry: "src/preload.ts",
            config: "vite.preload.config.mjs",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.renderer.config.mjs",
          },
        ],
      },
    },
  ],
};
