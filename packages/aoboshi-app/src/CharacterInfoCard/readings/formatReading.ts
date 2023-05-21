/**
 * Formats Kanjidic readings for display.
 *
 * @param reading onyomi or kunyomi in Kanjidic format
 */
export const formatReading = (reading: string): string =>
  reading.replace("-", "〜").replace(".", "-");
