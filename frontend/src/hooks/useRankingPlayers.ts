import { RankingService, type GlobalPlayer } from "@/api/brawlstars";
import { useEffect, useState } from "react";

/**
 * Custom hook that fetches and returns the global player ranking data.
 *
 * @module useRankingPlayers
 * @returns {Object} An object containing the loading state and players array
 * @property {boolean} loading - Indicates if the data is currently being fetched
 * @property {Array<GlobalPlayer>} players - Array of global player ranking data
 */
export const useRankingPlayers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<GlobalPlayer[]>([]);

  const fetchRankingPlayers = async () => {
    try {
      const res = await RankingService.getRankingPlayers();
      if (!res) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlayers(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingPlayers();
  }, []);

  return { loading, players };
};
