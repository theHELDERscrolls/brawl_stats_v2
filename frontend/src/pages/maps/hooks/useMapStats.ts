import { MapService, type MapDetail } from "@/api";
import { useCallback, useEffect, useState } from "react";

const SESSION_STORAGE_PREFIX = "map_stats_";

/**
 * Custom hook to fetch and manage detailed map statistics by ID
 * @param mapId - The ID of the map to fetch statistics for (null for no fetch)
 * @returns Object containing loading state and map statistics data
 */
export const useMapStats = (mapId: number | null) => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing map statistics data
  const [mapStats, setMapStats] = useState<MapDetail | null>(null);

  // Memoized function to fetch map statistics
  const fetchMapStats = useCallback(async () => {
    // Skip fetch if no map ID provided
    if (mapId === null) return;

    try {
      // Try to read cached map stats from sessionStorage
      const cacheKey = SESSION_STORAGE_PREFIX + mapId;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setMapStats(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch map data from service
      const res = await MapService.getMapById(mapId);
      if (!res) return;

      // Update state with fetched map statistics
      setMapStats(res);

      // Persist map stats in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(res));
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  }, [mapId]);

  // Effect to trigger data fetch when mapId changes
  useEffect(() => {
    fetchMapStats();
  }, [fetchMapStats]);

  // Return loading state and map statistics data
  return { loading, mapStats };
};
