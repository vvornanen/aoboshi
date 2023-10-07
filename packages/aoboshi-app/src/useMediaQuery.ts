import { useEffect, useState } from "react";

/** Returns true if the given media query matches and updates on change */
export const useMediaQuery = (query: string): boolean => {
  const [result, setResult] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setResult(event.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return result;
};
