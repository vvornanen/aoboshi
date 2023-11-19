import { InitOptions } from "i18next";
import jp from "./locales/jp.json";

export const defaultNS = "translation";
export const resources = {
  jp: {
    translation: jp,
  },
} as const;

export const options = {
  lng: "jp",
  ns: [defaultNS],
  defaultNS,
  resources,
} satisfies InitOptions;
