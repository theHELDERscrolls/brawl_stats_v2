import { RankingService, type GlobalBrawler } from "@/api";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook that fetches and returns the best players for a specific brawler.
 *
 * @module useRankingBrawlers
 * @param {number|null} brawlerId - The ID of the brawler to fetch rankings for, or null to skip fetching
 * @returns {Object} An object containing the loading state and bestPlayers array
 * @property {boolean} loading - Indicates if the data is currently being fetched
 * @property {Array<GlobalBrawler>} bestPlayers - Array of top players for the specified brawler
 *
 * @example
 * // Example usage in a React component:
 * function BrawlerRankings() {
 *   const [selectedBrawlerId, setSelectedBrawlerId] = useState(16000000); // Shelly's ID
 *   const { loading, bestPlayers } = useRankingBrawlers(selectedBrawlerId);
 *
 *   if (loading) {
 *     return <div>Loading top players for this brawler...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h2>Top Players for Selected Brawler</h2>
 *       {bestPlayers.length === 0 ? (
 *         <p>Select a brawler to see top players</p>
 *       ) : (
 *         <ul>
 *           {bestPlayers.map(player => (
 *             <li key={player.tag}>
 *               {player.name} - {player.trophies} trophies
 *             </li>
 *           ))}
 *         </ul>
 *       )}
 *     </div>
 *   );
 * }
 */
export const useRankingBrawlers = (brawlerId: number | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [bestPlayers, setBestPlayers] = useState<GlobalBrawler[]>([]);

  const fetchRankingBrawlers = useCallback(async () => {
    if (brawlerId === null) {
      setBestPlayers([]);
      setLoading(false);
      return;
    }

    try {
      const res = await RankingService.getRankingBrawlers(brawlerId);
      if (!res) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBestPlayers(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [brawlerId]);

  useEffect(() => {
    fetchRankingBrawlers();
  }, [fetchRankingBrawlers]);

  return { loading, bestPlayers };
};
