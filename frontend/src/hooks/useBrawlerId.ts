import { BrawlerService, type BrawlerDetail } from "@/api";
import { useCallback, useEffect, useState } from "react";

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
      // Fetch brawler data from service
      const res = await BrawlerService.getBrawlerById(brawlerId);
      if (!res) return;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update state with fetched data
      setBrawlerData(res);
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
