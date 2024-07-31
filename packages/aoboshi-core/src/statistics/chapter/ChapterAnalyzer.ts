import { BookRepository } from "../../books/BookRepository";
import { Chapter } from "../../books/Book";
import { randomId } from "../../randomId";
import { StatisticsByCharacter } from "../character/StatisticsByCharacter";
import { mergeStatisticsByChapter } from "../statisticsUtils";
import { Analyzer } from "../Analyzer";
import { AnalysisContext } from "../AnalysisContext";
import { StatisticsByChapter } from "./StatisticsByChapter";
import { StatisticsByChapterRepository } from "./StatisticsByChapterRepository";

/**
 * Generates card review statistics aggregated by book chapter.
 *
 * Incrementally merges the generated statistics with existing data.
 */
export class ChapterAnalyzer implements Analyzer {
  constructor(
    private bookRepository: BookRepository,
    private statisticsByChapterRepository: StatisticsByChapterRepository,
  ) {}

  run(context: AnalysisContext) {
    const statisticsByChapters = this.getStatisticsByChapters(
      context.statisticsByCharacters,
    );
    this.mergeAndSaveStatisticsByChapters(statisticsByChapters);
  }

  getStatisticsByChapters(statisticsByCharacters: StatisticsByCharacter[]) {
    const books = this.bookRepository.findAll();
    const statisticsByChapters: StatisticsByChapter[] = [];

    for (const book of books) {
      for (const volume of book.volumes) {
        for (const chapter of volume.chapters) {
          statisticsByChapters.push(
            this.getStatisticsByChapter(
              book.id,
              chapter,
              statisticsByCharacters,
            ),
          );
        }
      }
    }

    return statisticsByChapters;
  }

  getStatisticsByChapter(
    bookId: string,
    chapter: Chapter,
    statisticsByCharacters: StatisticsByCharacter[],
  ): StatisticsByChapter {
    const statisticsByCharactersMap = toMap(statisticsByCharacters);

    const seenCharacters = new Set<string>();
    const newCharacters = new Set<string>();
    const unseenCharacters = new Set<string>();

    for (const character of chapter.characters) {
      const literal =
        typeof character === "string" ? character : character.literal;
      const statisticsByCharacter = statisticsByCharactersMap.get(literal);

      if (!statisticsByCharacter) {
        unseenCharacters.add(literal);
        continue;
      }

      if (statisticsByCharacter.numberOfReviews > 0) {
        seenCharacters.add(literal);
      } else if (
        statisticsByCharacter.numberOfReviews === 0 &&
        statisticsByCharacter.numberOfCards > 0
      ) {
        newCharacters.add(literal);
      } else {
        unseenCharacters.add(literal);
      }
    }

    return {
      id: randomId(),
      bookId,
      chapterId: chapter.id,
      seenCharacters: Array.from(seenCharacters).join(""),
      newCharacters: Array.from(newCharacters).join(""),
      unseenCharacters: Array.from(unseenCharacters).join(""),
      numberOfSeenCharacters: seenCharacters.size,
      numberOfNewCharacters: newCharacters.size,
      numberOfUnseenCharacters: unseenCharacters.size,
      totalNumberOfCharacters: chapter.characters.length,
    };
  }

  private mergeAndSaveStatisticsByChapters(
    statisticsByChapters: StatisticsByChapter[],
  ) {
    const result: StatisticsByChapter[] = [];

    for (const stats of statisticsByChapters) {
      const merged = mergeStatisticsByChapter(
        this.statisticsByChapterRepository.findByChapter(stats.chapterId),
        stats,
      );
      result.push(merged);
    }

    this.statisticsByChapterRepository.saveAll(result);

    return result;
  }
}

const toMap = (stats: StatisticsByCharacter[]) => {
  const statisticsByCharacters = new Map<string, StatisticsByCharacter>();
  stats.forEach((stats) => statisticsByCharacters.set(stats.literal, stats));
  return statisticsByCharacters;
};
