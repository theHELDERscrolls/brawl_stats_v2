import { BrawlerService, type BrawlerDetail } from "@/api/brawl-stars-api";
import { preloadImages } from "@/utils";
import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "brawlers_data";

/**
 * Custom hook to fetch and manage brawlers data with image preloading and sessionStorage persistence
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
      // First, try to get cached brawlers from sessionStorage
      const cached = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (cached) {
        const parsed: BrawlerDetail[] = JSON.parse(cached);
        setBrawlers(parsed);
        setLoading(false);

        // Preload images even if we have cached data
        const urls = parsed.map(
          (b) =>
            `https://raw.githubusercontent.com/Brawlify/CDN/master/brawlers/portraits/${b.id}.png`
        );
        preloadImages(urls); // preload asynchronously, do not block render
        return;
      }

      // If no cached data, fetch from the API
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

      // Update state with fetched brawlers data
      setBrawlers(res.list);

      // Store fetched brawlers in sessionStorage for persistence
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(res.list));
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
