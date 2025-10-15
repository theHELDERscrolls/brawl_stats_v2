import { BrawlerService, type BrawlerDetail } from "@/api";
import { useCallback, useEffect, useState } from "react";

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
