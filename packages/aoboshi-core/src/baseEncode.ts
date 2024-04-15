// Different encoding schemes defined here mostly for fun and testing the algorithm
export const BASE_2 = "01";
export const BASE_8 = "01234567";
export const BASE_16 = "0123456789abcdef";
export const BASE_58 =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
export const BASE_62 =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Converts decimal values (base10 integer) to another base encoded using the
 * given characters.
 *
 * @param value decimal to encode
 * @param characters length of the string defines the output base
 */
export const baseEncode = (
  value: number | bigint,
  characters: string,
): string => {
  if (value < 0) {
    throw new Error("Value must be non-negative integer");
  } else if (characters.length < 2) {
    throw new Error("Characters must contain at least 2 characters");
  }

  const base = BigInt(characters.length);
  let remainder = BigInt(value);
  let result = "";

  do {
    result = characters.charAt(Number(remainder % base)) + result;
    remainder = remainder / base;
  } while (remainder > 0);

  return result;
};

/**
 * Converts base10 integers to base62.
 *
 * @param value base10 integer to encode
 */
export const base62Encode = (value: number | bigint): string =>
  baseEncode(value, BASE_62);
