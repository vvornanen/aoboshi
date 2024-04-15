import { getRandomValues } from "crypto";
import { base62Encode } from "./baseEncode";

/**
 * Generates a random identifier.
 *
 * Uses 128 bits random value with base62 encoding and zero padding so that
 * the returned string is always 22 characters long.
 */
export const randomId = (): string => {
  const buf = new BigUint64Array(2);
  getRandomValues(buf);
  return base62Encode(buf[0] + (buf[1] << 64n)).padStart(22, "0");
};
