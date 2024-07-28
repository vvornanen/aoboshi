import { Repository } from "../Repository";
import { StatisticsIncrement } from "./StatisticsIncrement";

export interface StatisticsIncrementRepository
  extends Repository<StatisticsIncrement, string> {
  /**
   * Finds the latest increment.
   *
   * @return null if increment not found
   */
  findLatest(): StatisticsIncrement | null;
}
