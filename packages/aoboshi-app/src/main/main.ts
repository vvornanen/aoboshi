import { app, BrowserWindow } from "electron";
import { init } from "i18next";
import { options } from "../i18n";
import { MainWindow } from "./MainWindow";
import { getApplicationContext } from "./ApplicationContext";
import { MigrationService } from "./migration/MigrationService";

const applicationContext = getApplicationContext();

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
  applicationContext.applicationMenu.update();
  applicationContext.mainWindow = new MainWindow(applicationContext);

  await Promise.all([applicationContext.mainWindow.open(), initApplication()]);
});

app.on("activate", () => {
  // Re-create the window when the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    applicationContext.mainWindow?.open();
  }
});
