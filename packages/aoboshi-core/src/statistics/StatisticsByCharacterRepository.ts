import { Repository } from "../Repository";
import { StatisticsByCharacter } from "./StatisticsByCharacter";

/**
 * Persists statistics in a repository (e.g. SQLite database)
 */
export interface StatisticsByCharacterRepository
  extends Repository<StatisticsByCharacter, string> {
  /**
   * Finds latest statistics by character literal.
   *
   * @param literal
   * @return null if character was not found
   */
  findByLiteral(literal: string): StatisticsByCharacter | null;
}
