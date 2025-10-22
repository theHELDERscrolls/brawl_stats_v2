import { RankingService, type GlobalPlayer } from "@/api/official-api";
import { useEffect, useState } from "react";

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
      // Fetch player rankings from service
      const res = await RankingService.getRankingPlayers();
      if (!res) return;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update state with player items from response
      setPlayers(res.items);
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
