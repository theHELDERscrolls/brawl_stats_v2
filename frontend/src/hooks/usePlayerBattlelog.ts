import { PlayerService, type PlayerBattlelog } from "@/api/official-api";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook to fetch and manage player battlelog by tag
 * @param playerTag - The player tag to fetch battlelog for (null for no fetch)
 * @returns Object containing loading state and battlelog data
 */
export const useBattlelog = (playerTag: string | null) => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing player battlelog data
  const [playerBattlelog, setPlayerBattlelog] = useState<PlayerBattlelog | null>(null);

  // Memoized function to fetch player battlelog
  const fetchPlayerBattlelog = useCallback(async () => {
    // Skip fetch if no player tag provided
    if (playerTag === null) return;

    try {
      // Fetch battlelog data from service
      const res = await PlayerService.getPlayerBattlelog(playerTag);
      if (!res) return;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update state with fetched battlelog data
      setPlayerBattlelog(res);
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  }, [playerTag]);

  // Effect to trigger data fetch when playerTag changes
  useEffect(() => {
    fetchPlayerBattlelog();
  }, [fetchPlayerBattlelog]);

  // Return loading state and player battlelog data
  return { loading, playerBattlelog };
};
