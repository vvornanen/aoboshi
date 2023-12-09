/**
 * A generic inteface for storing entities in a repository (e.g. SQLite database)
 */
export interface Repository<T, ID> {
  /**
   * Saves the given entity to the repository.
   *
   * Creates a new entity or updates an existing entity.
   *
   * @param entity
   */
  save(entity: T): void;

  /**
   * Saves all given entities to the repository.
   *
   * Creates a new entity or updates an existing entity.
   *
   * @param entities
   */
  saveAll(entities: T[]): void;

  /**
   * Finds an entity by id.
   *
   * @param id
   * @return null if entity was not found
   */
  findById(id: ID): T | null;

  /**
   * Returns all entities in the repository.
   */
  findAll(): T[];

  /**
   * Returns number of entities in the repository.
   */
  count(): number;

  /**
   * Returns true if the given entity exists in the repository.
   *
   * @param id
   */
  existsById(id: ID): boolean;

  /**
   * Deletes the given entity from the repository.
   *
   * @param id
   */
  deleteById(id: ID): void;

  /**
   * Deletes the given entity from the repository.
   *
   * @param entity entity object
   */
  delete(entity: T): void;

  /**
   * Deletes all entities from the repository.
   */
  deleteAll(): void;
}
