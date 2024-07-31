import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { Chapter } from "../books/Book";
import { grades } from "../fixtures/bookFixtures";
import { randomId } from "../randomId";
import { BookRepository } from "../books/BookRepository";
import * as fixtures from "./statisticsFixtures";
import { StatisticsByChapter } from "./StatisticsByChapter";
import { StatisticsByChapterRepository } from "./StatisticsByChapterRepository";
import { StatisticsByCharacterRepository } from "./StatisticsByCharacterRepository";
import { ChapterAnalyzer } from "./ChapterAnalyzer";

vi.mock("../randomId", () => {
  return {
    randomId: vi.fn(),
  };
});

const mockRandomId = (value?: string) => {
  let autoIncrement = 1;

  if (vi.isMockFunction(randomId)) {
    randomId.mockImplementation(() => value || String(autoIncrement++));
  }
};

const bookRepository = mock<BookRepository>();
const statisticsByChapterRepository = mock<StatisticsByChapterRepository>();
const statisticsByCharacterRepository = mock<StatisticsByCharacterRepository>();
const getCardStatisticsByCharacter = vi.fn();

const analyzer = new ChapterAnalyzer(
  bookRepository,
  statisticsByChapterRepository,
);

beforeEach(() => {
  mockRandomId();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("getStatisticsByChapter", () => {
  test("empty chapter", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "",
    };

    const actual = analyzer.getStatisticsByChapter(
      "book1",
      chapter,
      fixtures.multipleReviews.statisticsByCharacters,
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 0,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 0,
    };

    expect(actual).toEqual(expected);
  });

  test("no character statistics", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学",
    };

    const actual = analyzer.getStatisticsByChapter("book1", chapter, []);

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "",
      newCharacters: "",
      unseenCharacters: "学",
      numberOfSeenCharacters: 0,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 1,
      totalNumberOfCharacters: 1,
    };

    expect(actual).toEqual(expected);
  });

  test("one character (string type)", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学",
    };

    const actual = analyzer.getStatisticsByChapter(
      "book1",
      chapter,
      fixtures.oneCardOneReview.statisticsByCharacters,
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 1,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 1,
    };

    expect(actual).toEqual(expected);
  });

  test("one character (array type)", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: [{ literal: "学", n: 1 }],
    };

    const actual = analyzer.getStatisticsByChapter(
      "book1",
      chapter,
      fixtures.oneCardOneReview.statisticsByCharacters,
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 1,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 1,
    };

    expect(actual).toEqual(expected);
  });

  test("all unseen", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学大日",
    };

    const actual = analyzer.getStatisticsByChapter("book1", chapter, []);

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "",
      newCharacters: "",
      unseenCharacters: "学大日",
      numberOfSeenCharacters: 0,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 3,
      totalNumberOfCharacters: 3,
    };

    expect(actual).toEqual(expected);
  });

  test("some seen, no new", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学大日",
    };

    const actual = analyzer.getStatisticsByChapter("book1", chapter, [
      fixtures.seenCharacter("学"),
      fixtures.seenCharacter("大"),
    ]);

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学大",
      newCharacters: "",
      unseenCharacters: "日",
      numberOfSeenCharacters: 2,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 1,
      totalNumberOfCharacters: 3,
    };

    expect(actual).toEqual(expected);
  });

  test("some seen, some new", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学大日",
    };

    const actual = analyzer.getStatisticsByChapter("book1", chapter, [
      fixtures.seenCharacter("学"),
      fixtures.newCharacter("大"),
      fixtures.unseenCharacter("日"),
    ]);

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学",
      newCharacters: "大",
      unseenCharacters: "日",
      numberOfSeenCharacters: 1,
      numberOfNewCharacters: 1,
      numberOfUnseenCharacters: 1,
      totalNumberOfCharacters: 3,
    };

    expect(actual).toEqual(expected);
  });

  test("all seen", () => {
    const chapter: Chapter = {
      id: "chap1",
      code: "2",
      title: "test",
      characters: "学大日",
    };

    const actual = analyzer.getStatisticsByChapter(
      "book1",
      chapter,
      fixtures.multipleReviews.statisticsByCharacters,
    );

    const expected: StatisticsByChapter = {
      id: "1",
      bookId: "book1",
      chapterId: "chap1",
      seenCharacters: "学大日",
      newCharacters: "",
      unseenCharacters: "",
      numberOfSeenCharacters: 3,
      numberOfNewCharacters: 0,
      numberOfUnseenCharacters: 0,
      totalNumberOfCharacters: 3,
    };

    expect(actual).toEqual(expected);
  });
});

describe("getStatisticsByChapters", () => {
  test("grades book", () => {
    bookRepository.findAll.mockReturnValueOnce([grades]);

    const seenCharacters = [
      ..."一右雨王下火花貝学九金月見五口左三山子四字七手十出女小上森人水川大中田土二日木目六",
    ];

    const actual = analyzer.getStatisticsByChapters(
      seenCharacters.map((literal, index) => ({
        id: String(index + 1),
        literal,
        firstAdded: "2016-01-12",
        firstReviewed: "2016-01-13",
        lastReviewed: "2016-01-13",
        numberOfReviews: 1,
        numberOfCards: 1,
      })),
    );

    const expected: StatisticsByChapter[] = [
      {
        id: "1",
        bookId: "AtLesfR65Adc7q2XHVK7A8",
        chapterId: "4phqJluvSvwNLgogGM5bZw",
        seenCharacters: seenCharacters.join(""),
        newCharacters: "",
        unseenCharacters: [...grades.volumes[0].chapters[0].characters]
          .filter(
            (literal) =>
              typeof literal === "string" && !seenCharacters.includes(literal),
          )
          .join(""),
        numberOfSeenCharacters: seenCharacters.length,
        numberOfNewCharacters: 0,
        numberOfUnseenCharacters: 80 - seenCharacters.length,
        totalNumberOfCharacters: 80,
      },
    ];

    expect(actual).toEqual(expected);
  });
});

describe("run", () => {
  const testCase = {
    ...fixtures.oneCardOneReview,
    reviews: [
      {
        cardId: "1",
        expression: "学",
        reviewTime: "2016-01-15T18:45:21Z",
      },
    ],
  };

  beforeEach(() => {
    mockRandomId("random id");

    bookRepository.findAll.mockReturnValueOnce([grades]);

    getCardStatisticsByCharacter.mockImplementation(
      testCase.getCardStatisticsByCharacter,
    );

    statisticsByCharacterRepository.findByLiteral.mockReturnValueOnce(
      testCase.statisticsByCharacters[0],
    );
  });

  test("merges and saves statistics by chapter", () => {
    analyzer.run(testCase);

    const expected: StatisticsByChapter[] = [
      {
        id: "random id",
        bookId: "AtLesfR65Adc7q2XHVK7A8",
        chapterId: "4phqJluvSvwNLgogGM5bZw",
        seenCharacters: "学",
        newCharacters: "",
        unseenCharacters: (
          grades.volumes[0].chapters[0].characters as string
        ).replace("学", ""),
        numberOfSeenCharacters: 1,
        numberOfNewCharacters: 0,
        numberOfUnseenCharacters: 79,
        totalNumberOfCharacters: 80,
      },
    ];

    expect(statisticsByChapterRepository.saveAll).toHaveBeenCalledWith(
      expected,
    );
  });
});
