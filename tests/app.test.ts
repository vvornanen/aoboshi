import {
  test,
  expect,
  _electron as electron,
  ElectronApplication,
} from "@playwright/test";

const mainPath = "packages/aoboshi-app/.vite/build/main.js";

let electronApp: ElectronApplication;

test.beforeEach(async () => {
  electronApp = await electron.launch({
    args: [mainPath],
  });
});

test.afterEach(async () => {
  await electronApp.close();
});

test("launch app", async () => {
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    return app.isPackaged;
  });
  expect(isPackaged).toBeFalsy();

  const window = await electronApp.firstWindow();
  await window.screenshot({ path: "app.png" });
});
