// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require("node:path");

module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript",
    "plugin:storybook/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-refresh"],
  rules: {
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": "error",
    "import/namespace": "off",
    "import/newline-after-import": "error",
    "import/no-unresolved": "off",
    "import/no-restricted-paths": [
      "error",
      {
        basePath: resolve(__dirname, "./src"),
        zones: [
          {
            target: ["jobs", "preload", "renderer", "worker"],
            from: "main",
            message:
              "Main process code cannot be imported outside the main process",
          },
        ],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "electron",
            message: "Electron API is available only in the main process",
          },
        ],
      },
    ],
    "react-refresh/only-export-components": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
