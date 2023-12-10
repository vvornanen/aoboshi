# Scheduler

Directory `packages/aoboshi-app/src/jobs` contains background jobs which are managed with
[Bree](https://github.com/breejs/bree) scheduler.

As jobs are run in worker threads, they can use common services and utils from
`packages/aoboshi-app/src/worker`, but cannot use the Electron API.

## Adding a new job

- Create a `.ts` file for the job in `packages/aoboshi-app/src/jobs` directory.
- Configure job scheduling in `index.ts` in the same directory.
- One-time jobs can be triggered from migrations, see [docs](./migrations.md).
- Jobs can be triggered manually from the application menu by adding a menu item to `packages/aoboshi-app/src/main/ApplicationMenu.ts`.
  In the click event handler, call `Scheduler.run("job-name")`

```ts
const menuItem = {
  label: t("applicationMenu.reimportKanjiData"),
  click: () => {
    this.scheduler.run("import-kanji");
  },
};
```

Job names are type-safe, so the scheduler accepts only jobs defined in the `jobs/index.ts` file.
