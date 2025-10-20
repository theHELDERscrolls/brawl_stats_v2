import { MapService, type Maps } from "@/api/brawl-stars-api";
import { useEffect, useState } from "react";

/**
 * Fetches all available maps from the game.
 * @returns {{loading: boolean, maps: Maps|null}} Object containing loading state and maps data.
 */
export const useMaps = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [maps, setMaps] = useState<Maps | null>(null);

  const fetchMaps = async () => {
    try {
      const res = await MapService.getAllMaps();
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMaps(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  return { loading, maps };
};
