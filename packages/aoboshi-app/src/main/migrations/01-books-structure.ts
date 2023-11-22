import { Migration } from "./Migration";

export default {
  id: "01-books-structure",
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
