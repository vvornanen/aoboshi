import { BrowserWindow, ipcMain, Menu, MenuItem, shell } from "electron";
import { t } from "i18next";
import { IpcEventType } from "./IpcApi";
import { OnAfterInit } from "./ApplicationContext";

type ApplicationMenuState = {
  sidebarOpen: boolean;
  devToolsEnabled: boolean;
  mainWindowFocused: boolean;
  fullscreen: boolean;
};

/**
 * Builds application menu items.
 *
 * @see https://www.electronjs.org/docs/latest/api/menu#examples
 */
export class ApplicationMenu implements OnAfterInit {
  private state: ApplicationMenuState;

  constructor(initialState: ApplicationMenuState) {
    this.state = { ...initialState };
  }

  onAfterInit() {
    ipcMain.on(IpcEventType.ToggleSidebar, (_, value) => {
      this.sidebarOpen = value;
    });
  }

  get sidebarOpen(): boolean {
    return this.state.sidebarOpen;
  }

  set sidebarOpen(value: boolean) {
    this.state.sidebarOpen = value;
    this.update();
  }

  get devToolsEnabled(): boolean {
    return this.state.devToolsEnabled;
  }

  set devToolsEnabled(value: boolean) {
    this.state.devToolsEnabled = value;
    this.update();
  }

  get mainWindowFocused(): boolean {
    return this.state.mainWindowFocused;
  }

  set mainWindowFocused(value: boolean) {
    this.state.mainWindowFocused = value;
    this.update();
  }

  get fullscreen(): boolean {
    return this.state.fullscreen;
  }

  set fullscreen(value: boolean) {
    this.state.fullscreen = value;
    this.update();
  }

  update(): void {
    const onToggleSidebar = (
      _: MenuItem,
      focusedWindow: BrowserWindow | undefined,
    ) => {
      this.sidebarOpen = !this.sidebarOpen;
      this.update();
      focusedWindow?.webContents.send(
        IpcEventType.ToggleSidebar,
        this.sidebarOpen,
      );
    };

    const menuTemplate: Electron.MenuItemConstructorOptions[] = [
      {
        label: "",
        submenu: [
          {
            label: t("applicationMenu.about"),
            role: "about",
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.services"),
            role: "services",
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.hide"),
            role: "hide",
          },
          {
            label: t("applicationMenu.hideOthers"),
            role: "hideOthers",
          },
          {
            label: t("applicationMenu.unhide"),
            role: "unhide",
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.quit"),
            role: "quit",
          },
        ],
      },
      {
        label: t("applicationMenu.file"),
        submenu: [
          // 最近の漢字
          {
            label: t("Sidebar.recentlyStudied"),
            accelerator: "Command+1",
            click: (_, focusedWindow) =>
              focusedWindow?.webContents.send(IpcEventType.Navigate, "/"),
          },
          // TODO: Get books from store
          {
            label: "常用漢字",
            accelerator: "Command+2",
            click: (_, focusedWindow) =>
              focusedWindow?.webContents.send(
                IpcEventType.Navigate,
                "/books/1",
              ),
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.close"),
            role: "close",
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.shareMenu"),
            role: "shareMenu",
            sharingItem: undefined,
          },
        ],
      },
      {
        label: t("applicationMenu.edit"),
        submenu: [
          {
            label: t("applicationMenu.undo"),
            role: "undo",
          },
          {
            label: t("applicationMenu.redo"),
            role: "redo",
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.cut"),
            role: "cut",
          },
          {
            label: t("applicationMenu.copy"),
            role: "copy",
          },
          {
            label: t("applicationMenu.paste"),
            role: "paste",
          },
          {
            label: t("applicationMenu.pasteAndMatchStyle"),
            role: "pasteAndMatchStyle",
          },
          {
            label: t("applicationMenu.selectAll"),
            role: "selectAll",
          },
        ],
      },
      {
        label: t("applicationMenu.view"),
        submenu: [
          {
            id: "toggleSidebar",
            label: this.sidebarOpen
              ? t("applicationMenu.hideSidebar")
              : t("applicationMenu.showSidebar"),
            accelerator: "Command+Shift+L",
            enabled: this.mainWindowFocused,
            click: onToggleSidebar,
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.resetZoom"),
            role: "resetZoom",
          },
          {
            label: t("applicationMenu.zoomIn"),
            role: "zoomIn",
          },
          {
            label: t("applicationMenu.zoomOut"),
            role: "zoomOut",
          },
          {
            type: "separator",
          },
          {
            label: this.fullscreen
              ? t("applicationMenu.leaveFullscreen")
              : t("applicationMenu.enterFullscreen"),
            role: "togglefullscreen",
          },
        ],
      },
      {
        id: "window",
        label: t("applicationMenu.window"),
        role: "window",
        submenu: [
          {
            label: t("applicationMenu.minimize"),
            role: "minimize",
          },
          {
            label: t("applicationMenu.zoom"),
            role: "zoom",
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.front"),
            role: "front",
          },
        ],
      },
      {
        label: t("applicationMenu.help"),
        role: "help",
        submenu: [
          {
            label: t("applicationMenu.reportIssue"),
            click: () =>
              shell.openExternal("https://github.com/vvornanen/aoboshi/issues"),
          },
        ],
      },
    ];

    if (this.devToolsEnabled) {
      menuTemplate.push({
        label: t("applicationMenu.develop"),
        before: ["window"],
        submenu: [
          {
            label: t("applicationMenu.reload"),
            role: "reload",
          },
          {
            type: "separator",
          },
          {
            label: t("applicationMenu.toggleDevTools"),
            role: "toggleDevTools",
          },
        ],
      });
    }

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  }
}
