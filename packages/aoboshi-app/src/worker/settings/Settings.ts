import { TimeZoneConfig } from "@vvornanen/aoboshi-core/statistics";

export type Settings = {
  timeZoneConfig: TimeZoneConfig[];
  anki?: {
    url: string;
    apiKey: string;
    deckName: string; // For now, only one deck is supported
  };
};
