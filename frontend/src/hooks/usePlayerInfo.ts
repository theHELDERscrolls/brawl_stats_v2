import { PlayerService, type PlayerInfo } from "@/api";
import { useCallback, useEffect, useState } from "react";

const SESSION_STORAGE_PREFIX = "player_info_";

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
      // Try to read cached player info from sessionStorage
      const cacheKey = SESSION_STORAGE_PREFIX + playerTag;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setPlayerInfo(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch player data from service
      const res = await PlayerService.getPlayerInfo(playerTag);
      if (!res) return;

      // Update state with fetched player data
      setPlayerInfo(res);

      // Persist player info in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(res));
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
