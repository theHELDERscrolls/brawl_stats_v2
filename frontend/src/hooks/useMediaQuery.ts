import { useEffect, useState } from "react";

/**
 * A custom hook that tracks the state of a CSS media query.
 *
 * @param {string} query - The media query string to evaluate (e.g., '(min-width: 768px)')
 * @returns {boolean} Returns `true` if the media query matches the current viewport, `false` otherwise
 *
 * @example
 * // Basic usage
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 *
 * @example
 * // Responsive rendering
 * function Component() {
 *   const isLargeScreen = useMediaQuery('(min-width: 1200px)');
 *
 *   return (
 *     <div>
 *       {isLargeScreen ? <LargeLayout /> : <CompactLayout />}
 *     </div>
 *   );
 * }
 *
 * @remarks
 * This hook uses the Window.matchMedia() API and automatically updates
 * when the viewport size changes or when the query parameter changes.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia|MDN: Window.matchMedia()}
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
