# aoboshi-app

An Electron application including a React app in the renderer process
and an SQLite database in the main process.
The main process uses worker threads for running background tasks.

All yarn commands should be run in the repository root directory.

## Directory structure

Electron configuration follows [electron-vite conventions](https://electron-vite.org/guide/dev#conventions).

Further, the application code is organized by features both in the main and the renderer processes.

```
aoboshi-app/
├─ .storybook/            # Storybook configuration files
├─ src/
│  ├─ fixtures/           # Test data for tests and stories
│  ├─ jobs/               # Background jobs run in worker threads (see scheduler docs)
│  │  └─ index.ts         # Scheduler configuration for all jobs
│  ├─ locales/            # Translation files
│  ├─ main/               # Electron main process
│  │  └─ main.ts          # The main process entry point
│  ├─ migrations/         # Migration files (see migrations docs)
│  ├─ preload/            # Electron preload script
│  │  ├─ IpcApi.ts        # API for communication between the main and the renderer processes
│  │  └─ preload.ts       # The preload entry point
│  ├─ renderer/           # React app for the Electron renderer process
│  │  ├─ app/             # Layout, router and Redux store configurations
│  │  ├─ books/           # Feature
│  │  ├─ characters/      # Feature
│  │  ├─ common/          # Reusable React components (see Storybook)
│  │  ├─ icons/
│  │  ├─ recentlyStudied/ # Feature
│  │  ├─ statistics/      # Feature
│  │  ├─ theme/
│  │  ├─ renderer.tsx     # The renderer entry point
│  │  ├─ index.html
│  │  └─ styles.css.ts    # Global styles
│  ├─ resources/          # Additional resources packaged with the application (see forge.config.ts)
│  │  ├─ kanjidic2.xml.gz
│  │  └─ kanjivg.xml.gz
│  ├─ storybook/          # Storybook utils, e.g. decorators (see also .storybook/preview.ts)
│  ├─ worker/             # Services and utils for both the main process and worker threads
│  │  ├─ books/           # Feature
│  │  └─ characters/      # Feature
│  └─ i18n.ts             # Common i18next options for both main and renderer processes
├─ dev.db                 # SQLite database created when running yarn start
├─ forge.config.ts        # Electron Forge configuration
├─ package.json
├─ vite.main.config.ts
├─ vite.preload.config.ts
├─ vite.renderer.config.ts
└─ vitest.config.ts
```
