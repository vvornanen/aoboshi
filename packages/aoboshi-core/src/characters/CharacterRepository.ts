import { Character } from "./Character";

/**
 * Persists characters in a repository (e.g. SQLite database)
 */
export interface CharacterRepository {
  /**
   * Saves the given character to the repository.
   *
   * Creates a new character or updates an existing character.
   *
   * @param character
   */
  save(character: Character): void;

  /**
   * Saves all given characters to the repository.
   *
   * Creates a new character or updates an existing character.
   *
   * @param characters
   */
  saveAll(characters: Character[]): void;

  /**
   * Finds a character by literal.
   *
   * @param literal
   * @return null if character was not found
   */
  findByLiteral(literal: string): Character | null;

  /**
   * Returns all characters in the repository.
   */
  findAll(): Character[];

  /**
   * Returns number of characters in the repository.
   */
  count(): number;

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

  /**
   * Deletes the given character from the repository.
   *
   * @param character character object
   */
  delete(character: Character): void;

  /**
   * Deletes all characters from the repository.
   */
  deleteAll(): void;
}
