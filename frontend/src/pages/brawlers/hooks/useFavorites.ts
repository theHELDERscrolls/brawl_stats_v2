import { useState } from "react";

/**
 * Custom hook for managing favorite brawlers with local storage persistence
 * @returns Object containing favorites list and toggle function
 */
export const useFavorites = () => {
  // State for favorite brawler IDs, initialized from local storage
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Get saved favorites from local storage
    const saved = localStorage.getItem("favorite_brawlers");
    // Parse saved data or return empty array if none exists
    return saved ? (JSON.parse(saved) as number[]) : [];
  });

  // Function to toggle favorite status of a brawler
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      let updated: number[];

      // Remove brawler if already favorited, add if not
      if (prev.includes(id)) {
        updated = prev.filter((f) => f !== id);
      } else {
        updated = [...prev, id];
      }

      // Persist updated favorites to local storage
      localStorage.setItem("favorite_brawlers", JSON.stringify(updated));
      return updated;
    });
  };

  // Return favorites list and toggle function
  return { favorites, toggleFavorite };
};
