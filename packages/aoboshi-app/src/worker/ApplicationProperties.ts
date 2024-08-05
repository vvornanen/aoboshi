export type ApplicationProperties = {
  dbFilename: string;
  resourcesPath: string;
  logLevel: string;
  anki: {
    url: string;
    apiKey: string;
    deckName: string; // For now, only one deck is supported
  };
};

export type ApplicationEnvironmentVariable =
  | "DB_FILENAME"
  | "RESOURCES_PATH"
  | "LOGLEVEL"
  | "ANKI_URL"
  | "ANKI_API_KEY"
  | "ANKI_DECK_NAME";

export type ApplicationEnvironmentVariables = Record<
  ApplicationEnvironmentVariable,
  string
>;

export const getEnvironmentVariable = (
  name: ApplicationEnvironmentVariable,
  defaultValue?: string,
): string => {
  const value = process.env[name] || defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${name} undefined`);
  }

  return value;
};

export const propertiesAsEnv = (
  properties: ApplicationProperties,
): ApplicationEnvironmentVariables => ({
  DB_FILENAME: properties.dbFilename,
  RESOURCES_PATH: properties.resourcesPath,
  LOGLEVEL: properties.logLevel,
  ANKI_URL: properties.anki.url,
  ANKI_API_KEY: properties.anki.apiKey,
  ANKI_DECK_NAME: properties.anki.deckName,
});
