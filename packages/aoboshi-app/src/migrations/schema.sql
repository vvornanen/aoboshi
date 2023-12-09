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
