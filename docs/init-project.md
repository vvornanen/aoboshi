# Setting up Electron with Vite, Typescript, React and Storybook

Documented how this project was initialized, since there was not a suitable template for this
combination of tools.

## Required tools

Install required command line tools.

```bash
brew install jq moreutils
```

### Node.js

Use Node.js 20.

```bash
nvm use 20
```

### Yarn

```bash
corepack enable
corepack prepare yarn@stable --activate
```

## Init monorepo

```bash
mkdir aoboshi
cd aoboshi

yarn init -2 --workspace
yarn config set nodeLinker node-modules
yarn plugin import workspace-tools
yarn plugin import interactive-tools

sed 's/^!\.yarn\/cache$/#!.yarn\/cache/g' .gitignore | sponge .gitignore
sed 's/^#\.pnp\.\*$/.pnp.*/g' .gitignore | sponge .gitignore
echo "node_modules" >> .gitignore

echo "engine-strict = true" > .npmrc
cat package.json | jq '.engines = {"node":">=20","yarn":">=3.5","npm":"Please use yarn instead of npm"}' | sponge package.json
yarn dlx sort-package-json

yarn
```

IDEA project files: open project and save to generate the `.idea` directory.

```
git add .
git commit -m "initial commit"
```

### Set up nvm to use the correct Node.js version automatically

See: https://github.com/nvm-sh/nvm#zsh

```bash
echo "20" > .nvmrc
git add .nvmrc
git commit -m "build: add .nvmrc"
```

### Typescript

Install and configure Typescript.

```bash
yarn add --dev typescript
yarn tsc \
  --init \
  --target es2022 \
  --module esnext \
  --isolatedModules
cat tsconfig.json | npx strip-json-comments-cli | jq | sponge tsconfig.json
git add .
git commit -m "build: add typescript"
```

### ESLint

Configure ESLint

```bash
yarn add --dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import
```

```bash
npm pkg set scripts.lint="eslint --ext .ts,.tsx ."
echo ".eslintcache" >> .gitignore
```

Create file `.eslintrc.json`.

```json
{
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": "error",
    "import/newline-after-import": "error"
  }
}
```

Enable run eslint on save in IDEA settings: `{**/*,*}.{js,mjs,ts,tsx}`.

```bash
git add .
git commit -m "build: add eslint"
```

### Prettier

Install Prettier https://prettier.io/docs/en/install.html

```bash
yarn add --dev eslint-plugin-prettier eslint-config-prettier
yarn add --dev --exact prettier
echo {}> .prettierrc.json
echo ".yarn" > .prettierignore
```

Modify `.eslintrc.json`:

```diff
{
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/electron",
-    "plugin:import/typescript"
+    "plugin:import/typescript",
+    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": "error",
    "import/newline-after-import": "error"
  }
}
```

Enable run prettier on save in IDEA settings: `{**/*,*}.{js,mjs,jsx,ts,tsx,html,css,md,mdx,json}`.

```bash
git add .
git commit -m "build: add prettier"
```

---

Add pre-commit hook

```bash
yarn dlx mrm@2 lint-staged
npm pkg delete lint-staged
npm pkg set lint-staged='{"*.{html,css,md,mdx,json}":"prettier --write","*.{js,ts,tsx,mjs}":["prettier --write","eslint --cache --fix"]}' --json
yarn dlx sort-package-json
```

```bash
git add .
git commit -m "build: add lint-staged"
```

### Commitlint

Commitlint https://github.com/conventional-changelog/commitlint

Possibly a few extra commit types: https://medium.com/neudesic-innovation/conventional-commits-a-better-way-78d6785c2e08

- build: The commit alters the build system or external dependencies of the product (adding,
  removing, or upgrading dependencies).
- **change**: The commit changes the implementation of an existing feature.
- chore: The commit includes a technical or preventative maintenance task that is necessary for
  managing the product or the repository, but it is not tied to any specific feature or user story.
  For example, releasing the product can be considered a chore. Regenerating generated code that
  must be included in the repository could be a chore.
- ci: The commit makes changes to continuous integration or continuous delivery scripts or
  configuration files.
- **deprecate**: The commit deprecates existing functionality, but does not remove it from the
  product. For example, sometimes older public APIs may get deprecated because newer, more efficient
  APIs are available. Removing the APIs could break existing integrations so the APIs may be marked
  as deprecated in order to encourage the integration developers to migrate to the newer APIs while
  also giving them time before removing older functionality.
- docs: The commit adds, updates, or revises documentation that is stored in the repository.
- feat: The commit implements a new feature for the application.
- fix: The commit fixes a defect in the application.
- perf: The commit improves the performance of algorithms or general execution time of the product,
  but does not fundamentally change an existing feature.
- refactor: The commit refactors existing code in the product, but does not alter or change existing
  behavior in the product.
- **remove**: The commit removes a feature from the product. Typically features are deprecated first
  for a period of time before being removed. Removing a feature from the product may be considered a
  breaking change that will require a major version number increment.
- revert: The commit reverts one or more commits that were previously included in the product, but
  were accidentally merged or serious issues were discovered that required their removal from the
  main branch.
- **security**: The commit improves the security of the product or resolves a security issue that
  has been reported.
- style: The commit updates or reformats the style of the source code, but does not otherwise change
  the product implementation.
- test: The commit enhances, adds to, revised, or otherwise changes the suite of automated tests for
  the product.

```bash
yarn add --dev @commitlint/{config-conventional,cli}
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
yarn prettier --write .
```

Configure pre-commit hook.

```bash
yarn husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

```bash
git add .
git commit -m "build: add commitlint"
```

### Readme

```
echo "\nElectron monorepo project template with Vite, Typescript, React and Storybook." >> README.md
git commit -am "docs: update readme"
```

### Docs

Add this file.

```bash
mkdir docs
touch docs/init-project.md
git add .
git commit -m "docs: add init-project.md"
```

## Init Electron app

See: https://www.electronforge.io/config/plugins/vite

```bash
yarn create electron-app packages/aoboshi-app --template=vite
```

Edit package.json

```bash
npm pkg delete description keywords author license --workspace=packages/aoboshi-app
npm pkg set private=true --json --workspace=packages/aoboshi-app
yarn workspace aoboshi-app dlx sort-package-json
echo "packages/*/.vite\npackages/*/out" >> .prettierignore
yarn prettier --write .

yarn workspace aoboshi-app add --dev typescript
yarn workspace aoboshi-app tsc \
  --init \
  --target es2022 \
  --module esnext \
  --moduleResolution bundler \
  --isolatedModules \
  --jsx react-jsx
cat packages/aoboshi-app/tsconfig.json | npx strip-json-comments-cli | jq '.include = ["src"]' | sponge packages/aoboshi-app/tsconfig.json
```

Convert files to Typescript.

```bash
mv packages/aoboshi-app/src/main.js packages/aoboshi-app/src/main.ts
mv packages/aoboshi-app/src/preload.js packages/aoboshi-app/src/preload.ts
mv packages/aoboshi-app/src/renderer.js packages/aoboshi-app/src/renderer.ts
```

Change require statements to imports in `main.js`.

```diff
- const { app, BrowserWindow } = require('electron');
- const path = require('path');
+ import path from "path";
+ import { app, BrowserWindow } from "electron";
```

Add the following type declarations to `main.ts`.

```diff
+ // This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Vite
+ // plugin that tells the Electron app where to look for the Vite-bundled app code (depending on
+ // whether you're running in development or production).
+ declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
+ declare const MAIN_WINDOW_VITE_NAME: string;
```

Update references to the files.

```bash
sed 's/\.js/.ts/g' packages/aoboshi-app/forge.config.js | sponge packages/aoboshi-app/forge.config.js
sed 's/renderer\.js/renderer.ts/g' packages/aoboshi-app/index.html | sponge packages/aoboshi-app/index.html
```

Create file `packages/aoboshi-app/.eslintrc.json`.

```json
{
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": "error",
    "import/newline-after-import": "error"
  }
}
```

```bash
git add .
git commit -am "build: create aoboshi-app"
```

### Remove unnecessary makers

We're building only for macOS, so remove unused makers from `forge.config.js`.

```bash
yarn workspace aoboshi-app remove @electron-forge/{maker-deb,maker-rpm,maker-squirrel}
```

Edit `forge.config.js`.

```diff
makers: [
-  {
-    name: '@electron-forge/maker-squirrel',
-    config: {},
-  },
  {
    name: '@electron-forge/maker-zip',
    platforms: ['darwin'],
  },
-  {
-    name: '@electron-forge/maker-deb',
-    config: {},
-  },
-  {
-    name: '@electron-forge/maker-rpm',
-    config: {},
-  },
],
```

```bash
git commit -am "build(app): remove unnecessary makers"
```

---

Remove Windows-related dependency from `src/main.js`.

```bash
yarn workspace aoboshi-app remove electron-squirrel-startup
```

Edit `src/main.js`.

```diff
- // Handle creating/removing shortcuts on Windows when installing/uninstalling.
- if (require('electron-squirrel-startup')) {
-   app.quit();
- }
```

```bash
git commit -am "build(app): remove electron-squirrel-startup"
```

### React

Install React

```bash
yarn workspace aoboshi-app add react react-dom
yarn workspace aoboshi-app add --dev @types/{react,react-dom} \
  eslint-plugin-{react,react-hooks,react-refresh,jsx-a11y} \
  @vitejs/plugin-react
yarn workspace aoboshi-app dlx sort-package-json
```

Modify `.eslintrc.json`:

```diff
{
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
+   "plugin:react/recommended",
+   "plugin:react/jsx-runtime",
+   "plugin:react-hooks/recommended",
+   "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
- "plugins": ["@typescript-eslint"],
+ "plugins": ["@typescript-eslint", "react-refresh"],
  "rules": {
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": "error",
-   "import/newline-after-import": "error"
-  }
+   "import/newline-after-import": "error",
+   "react-refresh/only-export-components": "warn"
+  },
+  "settings": {
+    "react": {
+      "version": "detect"
+    }
+  }
}
```

Configure `vite.renderer.config.mjs`:

```diff
import { defineConfig } from "vite";
+ import react from '@vitejs/plugin-react'

// https://vitejs.dev/config
- export default defineConfig({});
+ export default defineConfig({
+   plugins: [react()],
+ });
```

Modify `index.html`:

```diff
<!DOCTYPE html>
-<html>
+<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
  </head>
  <body>
-   <h1>💖 Hello World!</h1>
-   <p>Welcome to your Electron application.</p>
+   <div id="root"></div>
    <script type="module" src="/src/renderer.ts"></script>
  </body>
</html>
```

Create `src/App.tsx`.

```tsx
export const App = () => (
  <>
    <h1>💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
  </>
);
```

Then import it into `src/renderer.ts`:

```diff
+ import { createRoot } from "react-dom/client";
+ import { StrictMode } from "react";
+ import { App } from "./App";
import "./index.css";

+ const root = createRoot(document.getElementById("root") as HTMLElement);
+ root.render(
+   <StrictMode>
+     <App />
+   </StrictMode>
+ );
```

```bash
git add .
git commit -m "build(app): add react"
```

### Storybook

Initialize Storybook.

```bash
yarn workspace aoboshi-app dlx storybook@latest init
```

```bash
yarn prettier --write .
git add .
git commit -m "build: add storybook"
```
