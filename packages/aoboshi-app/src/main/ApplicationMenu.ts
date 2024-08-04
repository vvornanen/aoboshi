import { BrowserWindow, Menu, MenuItem, ipcMain, shell } from "electron";
import { t } from "i18next";
import { Book, BookRepository } from "@vvornanen/aoboshi-core/books";
import { Scheduler } from "~/main";
import { IpcEventType } from "~/preload";
import { OnAfterInit } from "~/worker";

type ApplicationMenuState = {
  sidebarOpen: boolean;
  devToolsEnabled: boolean;
  mainWindowFocused: boolean;
  fullscreen: boolean;
};

const notNull = <T>(value: T | null): value is T => value !== null;

/**
 * Builds application menu items.
 *
 * @see https://www.electronjs.org/docs/latest/api/menu#examples
 */
export class ApplicationMenu implements OnAfterInit {
  private state: ApplicationMenuState;
  private appMenu: Electron.MenuItemConstructorOptions = { role: "appMenu" };
  private fileMenu: Electron.MenuItemConstructorOptions | null = null;
  private editMenu: Electron.MenuItemConstructorOptions | null = null;
  private viewMenu: Electron.MenuItemConstructorOptions | null = null;
  private windowMenu: Electron.MenuItemConstructorOptions | null = null;
  private helpMenu: Electron.MenuItemConstructorOptions | null = null;
  private devMenu: Electron.MenuItemConstructorOptions | null = null;

  constructor(
    initialState: ApplicationMenuState,
    private bookRepository: BookRepository,
    private scheduler: Scheduler,
  ) {
    this.state = { ...initialState };
  }

  onAfterInit() {
    this.appMenu = this.buildAppMenu();
    this.fileMenu = this.buildFileMenu();
    this.editMenu = this.buildEditMenu();
    this.viewMenu = this.buildViewMenu();
    this.windowMenu = this.buildWindowMenu();
    this.helpMenu = this.buildHelpMenu();
    this.devMenu = this.buildDevMenu();
    this.update();

    ipcMain.on(IpcEventType.ToggleSidebar, (_, value) => {
      this.sidebarOpen = value;
    });
  }

  get sidebarOpen(): boolean {
    return this.state.sidebarOpen;
  }

  set sidebarOpen(value: boolean) {
    this.state.sidebarOpen = value;
    this.viewMenu = this.buildViewMenu();
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
    this.viewMenu = this.buildViewMenu();
    this.update();
  }

  get fullscreen(): boolean {
    return this.state.fullscreen;
  }

  set fullscreen(value: boolean) {
    this.state.fullscreen = value;
    this.viewMenu = this.buildViewMenu();
    this.update();
  }

  update(): void {
    const menuTemplate: Electron.MenuItemConstructorOptions[] = [
      this.appMenu,
      this.fileMenu,
      this.editMenu,
      this.viewMenu,
      this.devToolsEnabled ? this.devMenu : null,
      this.windowMenu,
      this.helpMenu,
    ].filter(notNull);

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  }

  private buildAppMenu(): Electron.MenuItemConstructorOptions {
    return {
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
    };
  }

  private buildFileMenu(): Electron.MenuItemConstructorOptions {
    const books: Book[] = this.bookRepository.findAll();

    return {
      label: t("applicationMenu.file"),
      submenu: [
        {
          label: t("Sidebar.recentlyStudied"),
          accelerator: "Command+1",
          click: (_, focusedWindow) =>
            focusedWindow?.webContents.send(IpcEventType.Navigate, "/"),
        },
        ...books.slice(0, 8).map(
          (book, index) =>
            ({
              label: book.titleShort,
              accelerator: `Command+${2 + index}`,
              click: (_, focusedWindow) =>
                focusedWindow?.webContents.send(
                  IpcEventType.Navigate,
                  `/books/${book.id}`,
                ),
            }) as Electron.MenuItemConstructorOptions,
        ),
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
    };
  }

  private buildEditMenu(): Electron.MenuItemConstructorOptions {
    return {
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
    };
  }

  private buildViewMenu(): Electron.MenuItemConstructorOptions {
    const onToggleSidebar = (
      _: MenuItem,
      focusedWindow: BrowserWindow | undefined,
    ) => {
      this.sidebarOpen = !this.sidebarOpen;
      focusedWindow?.webContents.send(
        IpcEventType.ToggleSidebar,
        this.sidebarOpen,
      );
    };

    return {
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
    };
  }

  private buildWindowMenu(): Electron.MenuItemConstructorOptions {
    return {
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
    };
  }

  private buildHelpMenu(): Electron.MenuItemConstructorOptions {
    return {
      label: t("applicationMenu.help"),
      role: "help",
      submenu: [
        {
          label: t("applicationMenu.reportIssue"),
          click: () =>
            shell.openExternal("https://github.com/vvornanen/aoboshi/issues"),
        },
      ],
    };
  }

  private buildDevMenu(): Electron.MenuItemConstructorOptions {
    return {
      label: t("applicationMenu.develop"),
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
        {
          type: "separator",
        },
        {
          label: t("applicationMenu.reimportKanjiData"),
          click: () => {
            this.scheduler.run("import-kanji");
          },
        },
      ],
    };
  }
}
