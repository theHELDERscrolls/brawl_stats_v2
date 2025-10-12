import { MapService, type Maps } from "@/api/brawlapi";
import { useEffect, useState } from "react";

export const useMaps = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [maps, setMaps] = useState<Maps | null>(null);

  const fetchMaps = async () => {
    try {
      const res = await MapService.getAllMaps();
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMaps(res);
      console.log(res);
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
