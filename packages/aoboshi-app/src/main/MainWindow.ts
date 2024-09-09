import { BrowserWindow, nativeTheme } from "electron";
import path from "path";
import { MainApplicationContext } from "./MainApplicationContext";
import { IpcEventType } from "~/preload/IpcApi";
import { darkPalette, lightPalette } from "~/renderer/theme/color";

export class MainWindow {
  private window: BrowserWindow | null = null;

  constructor(private context: MainApplicationContext) {}

  async open(): Promise<void> {
    this.window = new BrowserWindow({
      width: 1000,
      height: 600,
      backgroundColor: nativeTheme.shouldUseDarkColors
        ? darkPalette.surface.surface
        : lightPalette.surface.surface,
      titleBarStyle: "hiddenInset",
      trafficLightPosition: { x: 20, y: 18 },
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.window.on("enter-full-screen", () => {
      this.context.applicationMenu.fullscreen = true;
    });

    this.window.on("leave-full-screen", () => {
      this.context.applicationMenu.fullscreen = false;
    });

    this.window.on("focus", () => {
      this.context.applicationMenu.mainWindowFocused = true;
    });

    this.window.on("closed", () => {
      this.context.applicationMenu.mainWindowFocused = false;
      this.window = null;
    });

    this.window.on("close", () => {
      this.window?.setProgressBar(-1);
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      await this.window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      await this.window.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      );
    }
  }

  send(eventType: IpcEventType, payload: unknown) {
    this.window?.webContents.send(eventType, payload);
  }

  setProgress(value: number) {
    this.window?.setProgressBar(value);
  }
}
