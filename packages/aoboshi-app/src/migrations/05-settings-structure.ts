import { type Migration } from "~/main/migration";

export default {
  description: "Create settings table",
  async run({ database }): Promise<void> {
    database.exec(`
        create table Settings
        (
            id       int primary key,
            settings text
        )
    `);
  },
} satisfies Migration;
