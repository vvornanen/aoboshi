import { Migration } from "../main/migration/Migration";

export default {
  description: "Create character table",
  async run({ database }): Promise<void> {
    database.exec(`
        create table Character
        (
            id          int primary key,
            literal     text not null,
            radical     text,
            grade       int,
            strokeCount int  not null,
            onyomi      text not null,
            kunyomi     text not null,
            strokes     text
        )
    `);
  },
} satisfies Migration;
