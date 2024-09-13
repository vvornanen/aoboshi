import { Settings } from "~/settings";

export interface SettingsService<T extends Settings = Settings> {
  getSettings(): T;
  saveSettings(settings: T): void;
}
