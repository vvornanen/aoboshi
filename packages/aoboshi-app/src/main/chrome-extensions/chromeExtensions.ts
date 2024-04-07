import { ChromeExtension } from "./ChromeExtensionService";

export const chromeExtensions: Record<string, ChromeExtension> = {
  reactDevTools: {
    name: "React Developer Tools",
    id: "fmkadmapgofadopljbjfkapdkoienihi",
    version: "5.0.2_0",
    resource: "react-dev-tools.zip",
  },
};
