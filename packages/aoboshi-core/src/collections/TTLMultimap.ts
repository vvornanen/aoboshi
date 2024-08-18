import { Multimap } from "~/collections/Multimap";

/**
 * A {@link Multimap} that can expire after a defined TTL.
 */
export interface TTLMultimap<K, V> extends Multimap<K, V> {
  /** Returns true if the defined TTL was reached. */
  isExpired(): boolean;
}
