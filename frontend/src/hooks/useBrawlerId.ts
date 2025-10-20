import { BrawlerService, type BrawlerDetail } from "@/api";
import { useCallback, useEffect, useState } from "react";

/**
 * Fetches detailed data for a specific brawler by ID.
 * @param {number|null} brawlerId - The ID of the brawler to fetch data for.
 * @returns {{loading: boolean, bralwerData: BrawlerDetail|null}} Object containing loading state and brawler data.
 */
export const useBrawlerId = (brawlerId: number | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [bralwerData, setBrawlerData] = useState<BrawlerDetail | null>(null);

  const fetchBrawlerData = useCallback(async () => {
    if (brawlerId === null) return;

    try {
      const res = await BrawlerService.getBrawlerById(brawlerId);
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBrawlerData(res);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [brawlerId]);

  useEffect(() => {
    fetchBrawlerData();
  }, [fetchBrawlerData]);

  return { loading, bralwerData };
};
