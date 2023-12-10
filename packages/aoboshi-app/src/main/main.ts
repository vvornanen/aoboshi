import { app, BrowserWindow } from "electron";
import { init } from "i18next";
import { options } from "../i18n";
import { MigrationService } from "./migration/MigrationService";
import { getMainApplicationContext } from "./MainApplicationContext";

const applicationContext = getMainApplicationContext();

const initApplication = async () => {
  await init(options);

  const migrationService = new MigrationService(applicationContext);
  await migrationService.run();

  applicationContext.onAfterInit();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  await Promise.all([initApplication(), applicationContext.mainWindow.open()]);
});

app.on("window-all-closed", () => {
  // Keep the app running
});

app.on("activate", async () => {
  // Re-create the window when the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    await applicationContext.mainWindow.open();
  }
});
