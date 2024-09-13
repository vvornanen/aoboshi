export type ApplicationProperties = {
  dbFilename: string;
  resourcesPath: string;
  logLevel: string;
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
  ANKI_URL: getEnvironmentVariable("ANKI_URL", ""),
  ANKI_API_KEY: getEnvironmentVariable("ANKI_API_KEY", ""),
  ANKI_DECK_NAME: getEnvironmentVariable("ANKI_DECK_NAME", ""),
});
