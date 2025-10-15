import { MapService, type MapDetail } from "@/api";
import { useCallback, useEffect, useState } from "react";

/**
 * Fetches detailed statistics for a specific map.
 * @param {number|null} mapId - The ID of the map to fetch statistics for.
 * @returns {{loading: boolean, mapStats: MapDetail|null}} Object containing loading state and map statistics data.
 */
export const useMapStats = (mapId: number | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [mapStats, setMapStats] = useState<MapDetail | null>(null);

  const fetchMapStats = useCallback(async () => {
    if (mapId === null) return;

    try {
      const res = await MapService.getMapById(mapId);
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMapStats(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [mapId]);

  useEffect(() => {
    fetchMapStats();
  }, [fetchMapStats]);

  return { loading, mapStats };
};
