import { RankingService, type GlobalPlayer } from "@/api/official-api";
import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "ranking_players";

/**
 * Custom hook to fetch and manage global player ranking data
 * @returns Object containing loading state and players array
 */
export const useRankingPlayers = () => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing player ranking data
  const [players, setPlayers] = useState<GlobalPlayer[]>([]);

  // Function to fetch player ranking data
  const fetchRankingPlayers = async () => {
    try {
      // Try to read cached ranking players from sessionStorage
      const cached = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (cached) {
        setPlayers(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch player rankings from service
      const res = await RankingService.getRankingPlayers();
      if (!res) return;

      // Update state with player items from response
      setPlayers(res.items);

      // Persist ranking players in sessionStorage
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(res.items));
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Effect to trigger data fetch on component mount
  useEffect(() => {
    fetchRankingPlayers();
  }, []); // Empty dependency array - runs only once

  // Return loading state and players data
  return { loading, players };
};
