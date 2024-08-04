CREATE TABLE Migration
        (
            id          text primary key,
            description text not null,
            hash        text not null,
            timestamp   text not null
        );
CREATE TABLE Book
        (
            id text primary key,
            title text,
            titleShort text,
            volumes text
        );
CREATE TABLE Character
        (
            id          int primary key,
            literal     text not null,
            radical     text,
            grade       int,
            strokeCount int  not null,
            onyomi      text not null,
            kunyomi     text not null,
            strokes     text
        );
CREATE TABLE StatisticsIncrement
        (
            id               text primary key,
            start            text,
            end              text,
            numberOfReviews  int not null,
            numberOfNewCards int not null,
            duration         int not null
        );
CREATE INDEX StatisticsIncrement_end on StatisticsIncrement (end)
    ;
CREATE TABLE StatisticsByCharacter
        (
            id              text primary key,
            literal         text unique not null,
            firstAdded      text,
            firstReviewed   text,
            lastReviewed    text,
            numberOfReviews int  not null,
            numberOfCards   int  not null
        );
CREATE TABLE StatisticsByDay
        (
            id                          text primary key,
            date                        text unique not null,
            addedCharacters             text not null,
            firstSeenCharacters         text not null,
            reviewedCharacters          text not null,
            numberOfAddedCharacters     int  not null,
            numberOfFirstSeenCharacters int  not null,
            numberOfReviewedCharacters  int  not null,
            numberOfReviews             int  not null
        );
CREATE TABLE StatisticsByChapter
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
        );
CREATE UNIQUE INDEX StatisticsByChapter_book_chapter
            on StatisticsByChapter (bookId, chapterId)
    ;
