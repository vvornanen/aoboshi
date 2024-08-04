import { Repository } from "~";
import { StatisticsByDay } from "~/statistics/day";

/**
 * Persists statistics in a repository (e.g. SQLite database)
 */
export interface StatisticsByDayRepository
  extends Repository<StatisticsByDay, string> {
  /**
   * Finds latest statistics by day.
   *
   * @param date
   * @return null if data on the given date was not found
   */
  findByDate(date: string): StatisticsByDay | null;
}
