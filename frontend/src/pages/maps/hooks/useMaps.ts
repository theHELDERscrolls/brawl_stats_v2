import { MapService, type Maps } from "@/api/brawl-stars-api";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch and manage game maps data
 * @returns Object containing loading state and maps data
 */
export const useMaps = () => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing maps data
  const [maps, setMaps] = useState<Maps | null>(null);

  // Function to fetch maps data
  const fetchMaps = async () => {
    try {
      // Fetch maps from service
      const res = await MapService.getAllMaps();
      if (!res) return;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update state with fetched maps data
      setMaps(res);
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Effect to trigger data fetch on component mount
  useEffect(() => {
    fetchMaps();
  }, []); // Empty dependency array - runs only once

  // Return loading state and maps data
  return { loading, maps };
};
