import { useCallback, useSyncExternalStore } from "react";

/**
 * Run the given media query and listens for changes.
 *
 * @param query a media query string
 * @return true if the query matches, updates when the result changes
 */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

const getServerSnapshot = () => false;
