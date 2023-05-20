import { initReactI18next } from "react-i18next";
import { use } from "i18next";
import jp from "./locales/jp.json";

export const defaultNS = "translation";
export const resources = {
  jp: {
    translation: jp,
  },
} as const;

use(initReactI18next).init({
  lng: "jp",
  ns: [defaultNS],
  defaultNS,
  resources,
});
