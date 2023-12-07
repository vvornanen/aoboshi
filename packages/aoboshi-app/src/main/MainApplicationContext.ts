import { ApplicationContext } from "./ApplicationContext";
import { ApplicationMenu } from "./ApplicationMenu";
import { MainWindow } from "./MainWindow";

/** Extends the common application context with services available only in the main thread */
export class MainApplicationContext extends ApplicationContext {
  applicationMenu: ApplicationMenu;
  mainWindow: MainWindow;

  constructor() {
    super();

    this.applicationMenu = new ApplicationMenu(
      {
        sidebarOpen: true,
        devToolsEnabled: true,
        mainWindowFocused: false,
        fullscreen: false,
      },
      this.bookRepository,
    );

    this.mainWindow = new MainWindow(this);
  }
}
