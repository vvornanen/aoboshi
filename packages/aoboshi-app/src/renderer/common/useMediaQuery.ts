import { useEffect, useState } from "react";

/**
 * Run the given media query and listens for changes.
 *
 * @param query a media query string
 * @return true if the query matches, updates when the result changes
 */
export const useMediaQuery = (query: string): boolean => {
  const [result, setResult] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setResult(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => setResult(event.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return result;
};
