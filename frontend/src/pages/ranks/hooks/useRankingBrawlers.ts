import { RankingService, type GlobalBrawler } from "@/api";
import { useCallback, useEffect, useState } from "react";

const SESSION_STORAGE_PREFIX = "ranking_brawlers_";

/**
 * Custom hook to fetch and manage top players for a specific brawler
 * @param brawlerId - The ID of the brawler to fetch rankings for (null to skip fetching)
 * @returns Object containing loading state and best players array
 */
export const useRankingBrawlers = (brawlerId: number | null) => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing top players data
  const [bestPlayers, setBestPlayers] = useState<GlobalBrawler[]>([]);

  // Memoized function to fetch brawler rankings
  const fetchRankingBrawlers = useCallback(async () => {
    // Handle case when no brawler ID is provided
    if (brawlerId === null) {
      setBestPlayers([]);
      setLoading(false);
      return;
    }

    try {
      // Try to read cached brawler rankings from sessionStorage
      const cacheKey = SESSION_STORAGE_PREFIX + brawlerId;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setBestPlayers(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch brawler rankings from service
      const res = await RankingService.getRankingBrawlers(brawlerId);
      if (!res) return;

      // Update state with top players data
      setBestPlayers(res.items);

      // Persist ranking brawlers in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(res.items));
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  }, [brawlerId]);

  // Effect to trigger data fetch when brawlerId changes
  useEffect(() => {
    fetchRankingBrawlers();
  }, [fetchRankingBrawlers]);

  // Return loading state and best players data
  return { loading, bestPlayers };
};
