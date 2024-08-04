// Adapted from https://github.com/electron/forge/blob/main/packages/template/vite/tmpl/vite.base.config.mjs

import { builtinModules } from "node:module";
import { ConfigEnv, Plugin, UserConfig } from "vite";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Process {
      // Used for hot reload after preload scripts.
      viteDevServers: Record<string, import("vite").ViteDevServer>;
    }
  }
}

interface VitePluginRuntimeKeys {
  VITE_DEV_SERVER_URL: `${string}_VITE_DEV_SERVER_URL`;
  VITE_NAME: `${string}_VITE_NAME`;
}

export const builtins = [
  "electron",
  ...builtinModules.map((m) => [m, `node:${m}`]).flat(),
];

export const external = builtins;

export const getBuildConfig = (env: ConfigEnv<"build">): UserConfig => {
  const { root, mode, command } = env;

  return {
    root,
    mode,
    build: {
      // Prevent multiple builds from interfering with each other.
      emptyOutDir: false,
      // 🚧 Multiple builds may conflict.
      outDir: ".vite/build",
      watch: command === "serve" ? {} : null,
      minify: command === "build",
    },
    clearScreen: false,
  };
};

export const getDefineKeys = (
  names: string[],
): Record<string, VitePluginRuntimeKeys> => {
  const define: Record<string, VitePluginRuntimeKeys> = {};

  return names.reduce((acc, name) => {
    const NAME = name.toUpperCase();
    const keys: VitePluginRuntimeKeys = {
      VITE_DEV_SERVER_URL: `${NAME}_VITE_DEV_SERVER_URL`,
      VITE_NAME: `${NAME}_VITE_NAME`,
    };

    return { ...acc, [name]: keys };
  }, define);
};

const notEmpty = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;

export const getBuildDefine = (
  env: ConfigEnv<"build">,
): Record<string, unknown> => {
  const { command, forgeConfig } = env;

  const names = forgeConfig.renderer.map(({ name }) => name).filter(notEmpty);

  const defineKeys = getDefineKeys(names);

  return Object.entries(defineKeys).reduce((acc, [name, keys]) => {
    const { VITE_DEV_SERVER_URL, VITE_NAME } = keys;
    const def = {
      [VITE_DEV_SERVER_URL]:
        command === "serve"
          ? JSON.stringify(process.env[VITE_DEV_SERVER_URL])
          : undefined,
      [VITE_NAME]: JSON.stringify(name),
    };
    return { ...acc, ...def };
  }, {});
};

export const exposeRendererPlugin = (name: string): Plugin => {
  const { VITE_DEV_SERVER_URL } = getDefineKeys([name])[name];

  return {
    name: "@electron-forge/plugin-vite:expose-renderer",
    configureServer(server) {
      process.viteDevServers ??= {};
      // Expose server for preload scripts hot reload.
      process.viteDevServers[name] = server;

      server.httpServer?.once("listening", () => {
        const addressInfo = server.httpServer?.address();

        // Expose env constant for main process use.
        if (typeof addressInfo === "string") {
          process.env[VITE_DEV_SERVER_URL] = addressInfo;
        } else if (addressInfo) {
          process.env[VITE_DEV_SERVER_URL] =
            `http://localhost:${addressInfo.port}`;
        }
      });
    },
  };
};

export const hotRestartPlugin = (command: "reload" | "restart"): Plugin => {
  return {
    name: "@electron-forge/plugin-vite:hot-restart",
    closeBundle() {
      if (command === "reload") {
        for (const server of Object.values(process.viteDevServers)) {
          // Preload scripts hot reload.
          server.hot.send({ type: "full-reload" });
        }
      } else {
        // Main process hot restart.
        // https://github.com/electron/forge/blob/v7.2.0/packages/api/core/src/api/start.ts#L216-L223
        process.stdin.emit("data", "rs");
      }
    },
  };
};
