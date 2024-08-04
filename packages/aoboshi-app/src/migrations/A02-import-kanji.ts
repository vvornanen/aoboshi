import { type Migration } from "~/main/migration";

export default {
  description:
    "Import kanji data (KANJIDIC 2 v. 2023-343, KanjiVG v. 20230110)",
  repeatable: true,
  async run({ scheduler }): Promise<void> {
    await scheduler.run("import-kanji");
  },
} satisfies Migration;
