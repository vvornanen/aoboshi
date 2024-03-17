// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import storybook from "eslint-plugin-storybook";

export default tseslint.config(
  {
    ignores: ["packages/*/.vite/**", "packages/*/dist/**", "packages/*/out/**"],
  },
  {
    files: ["packages/**/*.{ts,tsx}"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.configs.typescript,
    ],
    plugins: { import: importPlugin },
    rules: {
      eqeqeq: ["error", "always"],
      // Copy rules from the recommended config because eslint-plugin-import does not yet support flat config
      // See: https://github.com/import-js/eslint-plugin-import/issues/2948
      ...importPlugin.configs.recommended.rules,
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/order": "error",
      "import/namespace": "off",
      "import/newline-after-import": "error",
      "import/no-unresolved": "off",
    },
  },
  {
    files: ["packages/aoboshi-app/**/*.{ts,tsx}"],
    extends: [reactRecommended, reactJsxRuntime, importPlugin.configs.electron],
    plugins: {
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Copy rules from the recommended config because eslint-plugin-jsx-a11y does not yet support flat config
      // See: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/965
      ...jsxA11y.configs.recommended.rules,
      // Copy rules from the recommended config because eslint-plugin-react-hooks does not yet support flat config
      // See: https://github.com/facebook/react/issues/28313
      ...reactHooks.configs.recommended.rules,
      "import/no-restricted-paths": [
        "error",
        {
          basePath: "packages/aoboshi-app/src",
          zones: [
            {
              target: ["!(main|migrations)/**"],
              from: "main",
              message:
                "Main process code cannot be imported outside the main process",
            },
            {
              target: ["**"],
              from: "storybook",
              message:
                "Storybook utils can only be used in storybook config files",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: ["packages/aoboshi-app/**/*.{ts,tsx}"],
    ignores: [
      "packages/aoboshi-app/src/main/**",
      "packages/aoboshi-app/src/preload/**",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "electron",
              message:
                "Electron API is available only in the preload and the main process",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/aoboshi-core/**/*.{ts,tsx}"],
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          basePath: "packages/aoboshi-core/src",
          zones: [
            {
              target: ["!(fixtures)/**/!(*.test.ts)"],
              from: "fixtures",
              message: "Test fixtures should be used only in tests",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/**/*.{ts,tsx}"],
    ignores: [
      "packages/**/*.test.{ts,tsx}",
      "packages/**/*.stories.{ts,tsx}",
      "packages/aoboshi-app/src/storybook/*",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@vvornanen/aoboshi-core/fixtures/*"],
              message:
                "Test fixtures should be used only in tests and Storybook",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/aoboshi-app/src/**/*.stories.{ts,tsx}"],
    plugins: { storybook },
    // Copy rules from the recommended config because eslint-plugin-storybook does not yet support flat config
    // See: https://github.com/storybookjs/eslint-plugin-storybook/issues/135
    rules: storybook.configs.recommended.overrides[0].rules,
  },
  {
    files: ["packages/aoboshi-app/.storybook/main.ts"],
    plugins: { storybook },
    rules: storybook.configs.recommended.overrides[1].rules,
  },
  prettier,
);
