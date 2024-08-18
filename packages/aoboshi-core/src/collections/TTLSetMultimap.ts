import { Temporal } from "@js-temporal/polyfill";
import { SetMultimap } from "~/collections/SetMultimap";
import { TTLMultimap } from "~/collections/TTLMultimap";

/**
 * A {@link TTLMultimap} implementation that associates unique values with each
 * key.
 */
export class TTLSetMultimap<K, V>
  extends SetMultimap<K, V>
  implements TTLMultimap<K, V>
{
  private readonly validBefore: number;

  /**
   * @param ttl number in milliseconds or a Temporal Duration
   */
  constructor(ttl: number | Temporal.Duration) {
    super();
    if (typeof ttl === "number") {
      this.validBefore = Temporal.Now.instant().add(
        Temporal.Duration.from({ milliseconds: ttl }),
      ).epochMilliseconds;
    } else {
      this.validBefore = Temporal.Now.instant().add(ttl).epochMilliseconds;
    }
  }

  isExpired() {
    return Temporal.Now.instant().epochMilliseconds >= this.validBefore;
  }
}
