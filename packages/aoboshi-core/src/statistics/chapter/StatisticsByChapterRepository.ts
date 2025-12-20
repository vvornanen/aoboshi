import { StatisticsByChapter } from ".";
import { Repository } from "~";

/**
 * Persists statistics in a repository (e.g. SQLite database)
 */
export interface StatisticsByChapterRepository extends Repository<
  StatisticsByChapter,
  string
> {
  /**
   * Finds latest statistics by book chapter.
   *
   * @param chapterId
   * @return null if chapter was not found
   */
  findByChapter(chapterId: string): StatisticsByChapter | null;
}
