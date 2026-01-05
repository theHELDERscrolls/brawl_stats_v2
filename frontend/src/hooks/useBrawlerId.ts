import { BrawlerService, type BrawlerDetail } from "@/api";
import { useCallback, useEffect, useState } from "react";

const SESSION_STORAGE_PREFIX = "brawler_";

/**
 * Custom hook to fetch and manage brawler data by ID
 * @param brawlerId - The ID of the brawler to fetch (null for no fetch)
 * @returns Object containing loading state and brawler data
 */
export const useBrawlerId = (brawlerId: number | null) => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing brawler data
  const [bralwerData, setBrawlerData] = useState<BrawlerDetail | null>(null);

  // Memorized function to fetch brawler data
  const fetchBrawlerData = useCallback(async () => {
    // Skip fetch if no brawler ID provided
    if (brawlerId === null) return;

    try {
      // Try to read cached brawler data from sessionStorage
      const cacheKey = SESSION_STORAGE_PREFIX + brawlerId;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setBrawlerData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch brawler data from service
      const res = await BrawlerService.getBrawlerById(brawlerId);
      if (!res) return;

      // Update state with fetched data
      setBrawlerData(res);

      // Persist brawler data in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(res));
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  }, [brawlerId]);

  // Effect to trigger data fetch when brawlerId changes
  useEffect(() => {
    fetchBrawlerData();
  }, [fetchBrawlerData]);

  // Return loading state and brawler data
  return { loading, bralwerData };
};
