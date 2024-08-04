import { type Migration } from "~/main/migration";

export default {
  description: "Create book table",
  async run({ database }): Promise<void> {
    database.exec(`
        create table Book
        (
            id text primary key,
            title text,
            titleShort text,
            volumes text
        )
    `);
  },
} satisfies Migration;
