import { StatisticsIncrement } from "~/statistics";
import { Repository } from "~";

export interface StatisticsIncrementRepository extends Repository<
  StatisticsIncrement,
  string
> {
  /**
   * Finds the latest increment.
   *
   * @return null if increment not found
   */
  findLatest(): StatisticsIncrement | null;
}
