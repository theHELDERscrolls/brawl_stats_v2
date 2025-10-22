import { BrawlerService, type BrawlerDetail } from "@/api/brawl-stars-api";
import { preloadImages } from "@/utils";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch and manage brawlers data with image preloading
 * @returns Object containing loading state and brawlers data
 */
export const useBrawlers = () => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing brawlers data
  const [brawlers, setBrawlers] = useState<BrawlerDetail[]>([]);

  // Function to fetch brawlers data and preload images
  const fetchBrawlers = async () => {
    try {
      // Fetch all brawlers from service
      const res = await BrawlerService.getAllBrawlers();
      if (!res) {
        alert("There are no brawlers available :(");
        return;
      }

      // Generate URLs for brawler portrait images
      const urls = res.list.map(
        (b) =>
          `https://raw.githubusercontent.com/Brawlify/CDN/master/brawlers/portraits/${b.id}.png`
      );

      // Preload all brawler images for better UX
      await preloadImages(urls);

      // Simulate minimum loading time for consistent experience
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update state with fetched brawlers data
      setBrawlers(res.list);
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Effect to trigger data fetch on component mount
  useEffect(() => {
    fetchBrawlers();
  }, []); // Empty dependency array - runs only once

  // Return loading state and brawlers data
  return { loading, brawlers };
};
