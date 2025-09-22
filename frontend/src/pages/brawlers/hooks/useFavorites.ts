import { useState } from "react";

/**
 * Custom React hook for managing favorite brawlers using local storage persistence.
 *
 * This hook provides functionality to manage a list of favorite brawler IDs that are
 * persisted in the browser's local storage. It initializes the favorites state from
 * local storage if available, and provides a toggle function to add or remove brawlers
 * from favorites while automatically updating local storage.
 *
 * @returns {Object} An object containing the favorites list and the toggle function.
 * @returns {number[]} return.favorites - Array of favorite brawler IDs.
 * @returns {Function} return.toggleFavorite - Function to toggle a brawler's favorite status.
 * @param {number} return.toggleFavorite.id - The ID of the brawler to toggle.
 *
 * @example
 * // Usage in a React component
 * const MyComponent = () => {
 *   const { favorites, toggleFavorite } = useFavorites();
 *
 *   return (
 *     <div>
 *       {brawlers.map(brawler => (
 *         <button
 *           key={brawler.id}
 *           onClick={() => toggleFavorite(brawler.id)}
 *           className={favorites.includes(brawler.id) ? 'favorite' : ''}
 *         >
 *           {brawler.name}
 *         </button>
 *       ))}
 *     </div>
 *   );
 * };
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorite_brawlers");
    return saved ? (JSON.parse(saved) as number[]) : [];
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      let updated: number[];

      if (prev.includes(id)) {
        updated = prev.filter((f) => f !== id);
      } else {
        updated = [...prev, id];
      }

      localStorage.setItem("favorite_brawlers", JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggleFavorite };
};
