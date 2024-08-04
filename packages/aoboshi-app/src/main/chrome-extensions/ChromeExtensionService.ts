import { join } from "path";
import { existsSync } from "fs";
import { execSync } from "child_process";
import { session, app } from "electron";
import { ApplicationContext } from "~/worker";

export type ChromeExtension = {
  name: string;
  id: string;
  version: string;
  resource: string;
};

const chromeExtensionsPath = join(app.getPath("userData"), "chrome-extensions");

/**
 * Manages loading Chrome DevTools extensions.
 *
 * Extensions compatible with the current Electron version are bundled as zip
 * files under resources directory. See readme for updating bundled versions.
 * Note that the extensions are not included in the packaged application,
 * so this service works only in development environment.
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/devtools-extension
 */
export class ChromeExtensionService {
  constructor(private context: ApplicationContext) {}

  async loadExtension(extension: ChromeExtension): Promise<void> {
    const extensionPath = join(
      chromeExtensionsPath,
      extension.id,
      extension.version,
    );

    if (!this.isInstalled(extensionPath)) {
      this.unzipExtension(extension);
    }

    try {
      console.log(`Loading ${extension.name} version ${extension.version}`);
      await session.defaultSession.loadExtension(extensionPath, {
        allowFileAccess: true,
      });
    } catch (error) {
      console.warn(`Loading ${extension.name} failed: ${error}`);
    }
  }

  private isInstalled(path: string): boolean {
    return existsSync(path);
  }

  private unzipExtension(extension: ChromeExtension): void {
    const resourcePath = join(
      this.context.properties.resourcesPath,
      extension.resource,
    );

    try {
      console.log(`Extracting ${resourcePath} to ${chromeExtensionsPath}`);
      execSync(`unzip -q -d '${chromeExtensionsPath}' '${resourcePath}'`);
    } catch (error) {
      console.error(`Could not extract extension ${extension.name}`, error);
    }
  }
}
