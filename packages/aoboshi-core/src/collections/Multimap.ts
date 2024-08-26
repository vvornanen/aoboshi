/**
 * A collection that can associate multiple values with each key.
 *
 * Inspired by Guava collections.
 *
 * @see https://github.com/google/guava/wiki/NewCollectionTypesExplained#multimap
 */
export interface Multimap<K, V> {
  /**
   * Stores a key-value pair in this multimap.
   *
   * @param key
   * @param value
   * @return `true` if the value was added, or `false` if the multimap already
   * contained the value and does not allow duplicates
   */
  add(key: K, value: V): boolean;

  /** Returns all values associated with the given key. */
  get(key: K): V[];
  // Add more methods when needed
}
