import { Migration } from "../main/migration/Migration";

export default {
  description: "Import kanji data (KANJIDIC 2 ver. 2023-343)",
  repeatable: true,
  async run({ scheduler }): Promise<void> {
    await scheduler.run("import-kanji");
  },
} satisfies Migration;
