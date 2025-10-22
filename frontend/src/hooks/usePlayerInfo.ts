import { PlayerService, type PlayerInfo } from "@/api";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook to fetch and manage player information by tag
 * @param playerTag - The player tag to fetch information for (null for no fetch)
 * @returns Object containing loading state and player data
 */
export const usePlayerInfo = (playerTag: string | null) => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing player information
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);

  // Memoized function to fetch player information
  const fetchPlayerInfo = useCallback(async () => {
    // Skip fetch if no player tag provided
    if (playerTag === null) return;

    try {
      // Fetch player data from service
      const res = await PlayerService.getPlayerInfo(playerTag);
      if (!res) return;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update state with fetched player data
      setPlayerInfo(res);
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  }, [playerTag]);

  // Effect to trigger data fetch when playerTag changes
  useEffect(() => {
    fetchPlayerInfo();
  }, [fetchPlayerInfo]);

  // Return loading state and player information
  return { loading, playerInfo };
};
