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
      tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    rules: {
      eqeqeq: ["error", "always"],
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends",
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        { includeInternal: true, includeTypes: true },
      ],
      "import/no-relative-parent-imports": "error",
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
    extends: [
      reactRecommended,
      reactJsxRuntime,
      reactHooks.configs.flat.recommended,
      importPlugin.flatConfigs.electron,
      jsxA11y.flatConfigs.recommended,
    ],
    plugins: {
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
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
              target: ["!(storybook)/**"],
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
  storybook.configs["flat/recommended"],
  {
    files: ["packages/aoboshi-app/src/**/*.stories.{ts,tsx}"],
    rules: {
      // Disable temporarily until Storybook is upgraded to >=9
      "storybook/no-renderer-packages": "off",
    },
  },
  prettier,
);
