import { useEffect, useState } from "react";

/**
 * A custom hook that tracks the state of a CSS media query.
 *
 * @param {string} query - The media query string to evaluate (e.g., '(min-width: 768px)')
 * @returns {boolean} Returns `true` if the media query matches the current viewport, `false` otherwise
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
