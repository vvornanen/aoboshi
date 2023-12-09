import { Repository } from "../Repository";
import { Character } from "./Character";

/**
 * Persists characters in a repository (e.g. SQLite database)
 */
export interface CharacterRepository extends Repository<Character, number> {
  /**
   * Finds a character by literal.
   *
   * @param literal
   * @return null if character was not found
   */
  findByLiteral(literal: string): Character | null;

  /**
   * Returns true if the given character exists in the repository.
   *
   * @param literal
   */
  existsByLiteral(literal: string): boolean;

  /**
   * Deletes the given character from the repository.
   *
   * @param literal
   */
  deleteByLiteral(literal: string): void;
}
