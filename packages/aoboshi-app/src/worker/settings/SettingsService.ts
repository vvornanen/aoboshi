import { Settings, SettingsRepository } from "~/worker/settings";

const defaultSettings: Settings = {
  timeZoneConfig: [{ timeZone: "UTC" }],
};

export class SettingsService {
  constructor(private settingsRepository: SettingsRepository) {}

  getSettings(): Settings {
    return this.settingsRepository.find() ?? defaultSettings;
  }

  saveSettings(settings: Settings) {
    this.settingsRepository.save(settings);
  }
}
