/**
 * Returns the given number of '〇' characters.
 *
 * For example, for filling {@link Skeleton} text with specific number of characters,
 * so that the Skeleton can infer text dimensions from the typography.
 *
 * @param count Number of characters to return
 */
export const maru = (count = 1): string => "〇".repeat(count);
