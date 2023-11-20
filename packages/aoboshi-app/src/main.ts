import { app, BrowserWindow, ipcMain } from "electron";
import "./i18n.main";
import { IpcEventType } from "./ipc";
import { ApplicationMenu } from "./mainProcess/ApplicationMenu";
import { MainWindow } from "./mainProcess/MainWindow";

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
