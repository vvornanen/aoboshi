import { useEffect, useState } from "react";
import { KanjiVG } from "./KanjiVG";

/**
 * Provides KanjiVG stroke paths for the given character.
 *
 * @param literal character
 */
export const useStrokePaths = (literal: string): [string | null, boolean] => {
  const [strokePaths, setStrokePaths] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    KanjiVG.fetch(literal)
      .then((result) => {
        if (result) {
          setStrokePaths(result.toString());
        } else {
          setStrokePaths(null);
        }
      })
      .finally(() => setLoading(false));
  }, [literal]);

  return [strokePaths, loading];
};
