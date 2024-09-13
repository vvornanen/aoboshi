import { SettingsService } from "@vvornanen/aoboshi-core/settings";
import { AppSettings, SettingsRepository } from "~/worker/settings";
import { getEnvironmentVariable } from "~/worker";

export class AppSettingsService implements SettingsService<AppSettings> {
  constructor(private settingsRepository: SettingsRepository) {}

  getSettings(): AppSettings {
    return this.settingsRepository.find() ?? this.getDefaultSettings();
  }

  saveSettings(settings: AppSettings) {
    this.settingsRepository.save(settings);
  }

  private getDefaultSettings(): AppSettings {
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
