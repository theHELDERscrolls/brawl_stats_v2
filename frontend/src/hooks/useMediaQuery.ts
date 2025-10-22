import { useEffect, useState } from "react";

/**
 * Custom hook to track and respond to CSS media query changes
 * @param query - The media query string to evaluate (e.g., '(min-width: 768px)')
 * @returns Boolean indicating if the media query matches the current viewport
 */
export const useMediaQuery = (query: string): boolean => {
  // State to store media query match result
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create MediaQueryList object
    const mediaQuery = window.matchMedia(query);

    // Handler for media query changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Set initial match state
    setMatches(mediaQuery.matches);

    // Add event listener for media query changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup: remove event listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]); // Re-run effect when query changes

  return matches;
};

export default useMediaQuery;
