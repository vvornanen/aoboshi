import { InitOptions } from "i18next";
import { ja } from "./locales/ja";

export const defaultNS = "translation";
export const resources = {
  ja: {
    translation: ja,
  },
} as const;

export const options = {
  lng: "ja",
  ns: [defaultNS],
  defaultNS,
  resources,
} satisfies InitOptions;
