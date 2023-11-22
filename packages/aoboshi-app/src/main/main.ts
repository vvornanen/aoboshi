import { app, BrowserWindow, ipcMain } from "electron";
import { init } from "i18next";
import { options } from "../i18n";
import { MainWindow } from "./MainWindow";
import { IpcEventType } from "./IpcApi";
import { createApplicationContext } from "./ApplicationContext";

init(options);

const applicationContext = createApplicationContext();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  applicationContext.applicationMenu.update();
  applicationContext.mainWindow = new MainWindow(applicationContext);

  ipcMain.on(IpcEventType.ToggleSidebar, (_, value) => {
    applicationContext.applicationMenu.sidebarOpen = value;
  });
});

app.on("activate", () => {
  // Re-create the window when the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    applicationContext.mainWindow = new MainWindow(applicationContext);
  }
});
