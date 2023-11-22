import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { init } from "i18next";
import { options } from "../i18n";
import { ApplicationMenu } from "./ApplicationMenu";
import { MainWindow } from "./MainWindow";
import { IpcEventType } from "./IpcApi";
import { getDatabase } from "./db/db";

init(options);

const dbFilename =
  process.env.DB_FILENAME || path.join(app.getPath("userData"), "aoboshi.db");
getDatabase(dbFilename, true);

const applicationMenu = new ApplicationMenu({
  sidebarOpen: true,
  devToolsEnabled: true,
  mainWindowFocused: false,
  fullscreen: false,
});

// Keep a reference to prevent garbage collection
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let mainWindow: MainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  applicationMenu.update();
  mainWindow = new MainWindow(applicationMenu);

  ipcMain.on(IpcEventType.ToggleSidebar, (_, value) => {
    applicationMenu.sidebarOpen = value;
  });
});

app.on("activate", () => {
  // Re-create the window when the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new MainWindow(applicationMenu);
  }
});
