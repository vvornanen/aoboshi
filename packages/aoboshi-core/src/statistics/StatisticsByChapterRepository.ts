import { Repository } from "../Repository";
import { StatisticsByChapter } from "./StatisticsByChapter";

/**
 * Persists statistics in a repository (e.g. SQLite database)
 */
export interface StatisticsByChapterRepository
  extends Repository<StatisticsByChapter, string> {}
