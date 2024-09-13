import { Settings as CoreSettings } from "@vvornanen/aoboshi-core/settings";

export type AppSettings = CoreSettings & {
  anki?: {
    url: string;
    apiKey: string;
    deckName: string; // For now, only one deck is supported
  };
};
