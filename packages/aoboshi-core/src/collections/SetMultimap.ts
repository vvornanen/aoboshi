import { Multimap } from "~/collections/Multimap";

/**
 * A {@link Multimap} implementation that associates unique values with each
 * key.
 */
export class SetMultimap<K, V> implements Multimap<K, V> {
  private values = new Map<K, Set<V>>();

  add(key: K, value: V) {
    let set = this.values.get(key);

    if (!set) {
      set = new Set();
      this.values.set(key, set);
    } else if (set.has(value)) {
      return false;
    }

    set.add(value);
    return true;
  }

  get(key: K): V[] {
    return Array.from(this.values.get(key) ?? []);
  }
}
