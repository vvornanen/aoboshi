import { Settings, SettingsRepository } from "~/worker/settings";
import { getEnvironmentVariable } from "~/worker";

export class SettingsService {
  constructor(private settingsRepository: SettingsRepository) {}

  getSettings(): Settings {
    return this.settingsRepository.find() ?? this.getDefaultSettings();
  }

  saveSettings(settings: Settings) {
    this.settingsRepository.save(settings);
  }

  private getDefaultSettings(): Settings {
    return {
      timeZoneConfig: [{ timeZone: "UTC" }],
      anki: process.env.ANKI_URL
        ? {
            url: getEnvironmentVariable("ANKI_URL"),
            apiKey: getEnvironmentVariable("ANKI_API_KEY"),
            deckName: getEnvironmentVariable("ANKI_DECK_NAME"),
          }
        : undefined,
    };
  }
}
