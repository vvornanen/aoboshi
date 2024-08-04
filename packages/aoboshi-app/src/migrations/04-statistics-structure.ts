import { type Migration } from "~/main/migration";

export default {
  description: "Create statistics tables",
  async run({ database }): Promise<void> {
    database.exec(`
        create table StatisticsIncrement
        (
            id               text primary key,
            start            text,
            end              text,
            numberOfReviews  int not null,
            numberOfNewCards int not null,
            duration         int not null
        )
    `);

    database.exec(`
        create table StatisticsByCharacter
        (
            id              text primary key,
            literal         text not null,
            firstAdded      text,
            firstReviewed   text,
            lastReviewed    text,
            numberOfReviews int  not null,
            numberOfCards   int  not null
        )
    `);

    database.exec(`
        create table StatisticsByDay
        (
            id                          text primary key,
            date                        text not null,
            addedCharacters             text not null,
            firstSeenCharacters         text not null,
            reviewedCharacters          text not null,
            numberOfAddedCharacters     int  not null,
            numberOfFirstSeenCharacters int  not null,
            numberOfReviewedCharacters  int  not null,
            numberOfReviews             int  not null
        )
    `);

    database.exec(`
        create table StatisticsByChapter
        (
            id                       text primary key,
            bookId                   text not null,
            chapterId                text not null,
            seenCharacters           text not null,
            newCharacters            text not null,
            unseenCharacters         text not null,
            numberOfSeenCharacters   int  not null,
            numberOfNewCharacters    int  not null,
            numberOfUnseenCharacters int  not null,
            totalNumberOfCharacters  int  not null,

            foreign key (bookId) references Book (id) on delete cascade
        )
    `);
  },
} satisfies Migration;
