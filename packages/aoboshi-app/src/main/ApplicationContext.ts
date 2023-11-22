import path from "path";
import { app } from "electron";
import { Database } from "better-sqlite3";
import { ApplicationMenu } from "./ApplicationMenu";
import { getDatabase } from "./database";
import { MainWindow } from "./MainWindow";
import { MigrationService } from "./migrations/MigrationService";

export interface ApplicationContext {
  database: Database;
  applicationMenu: ApplicationMenu;
  mainWindow: MainWindow | null;
}

export const createApplicationContext = (): ApplicationContext => {
  const dbFilename =
    process.env.DB_FILENAME || path.join(app.getPath("userData"), "aoboshi.db");
  const database = getDatabase(dbFilename, true);

  const applicationMenu = new ApplicationMenu({
    sidebarOpen: true,
    devToolsEnabled: true,
    mainWindowFocused: false,
    fullscreen: false,
  });

  const context: ApplicationContext = {
    database,
    applicationMenu,
    mainWindow: null,
  };

  const migrationService = new MigrationService(context);
  migrationService.run();

  return context;
};
