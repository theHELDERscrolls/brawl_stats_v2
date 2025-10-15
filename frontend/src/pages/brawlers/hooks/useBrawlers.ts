import { BrawlerService, type BrawlerDetail } from "@/api/brawlapi";
import { preloadImages } from "@/utils";
import { useEffect, useState } from "react";

/**
 * Custom React hook that fetches and manages brawlers data with preloading of images.
 *
 * This hook handles the asynchronous fetching of brawlers data from the BrawlerService API,
 * preloads the associated brawler images to improve user experience, and manages loading state.
 * It includes error handling for API failures and provides a simulated minimum loading time
 * of 1 second to ensure a consistent user experience even when data loads quickly.
 *
 * @returns {Object} An object containing the loading state and the fetched brawlers data.
 * @returns {boolean} return.loading - Indicates whether the brawlers data is still being fetched (true) or has completed (false).
 * @returns {BrawlerDetail[]} return.brawlers - Array of brawler objects with detailed information.
 *
 * @throws Will display alert messages for API errors or empty responses.
 */
export const useBrawlers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [brawlers, setBrawlers] = useState<BrawlerDetail[]>([]);

  const fetchBrawlers = async () => {
    try {
      const res = await BrawlerService.getAllBrawlers();
      if (!res) {
        alert("There are no brawlers available :(");
        return;
      }

      const urls = res.list.map(
        (b) =>
          `https://raw.githubusercontent.com/Brawlify/CDN/master/brawlers/portraits/${b.id}.png`
      );

      await preloadImages(urls);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBrawlers(res.list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrawlers();
  }, []);

  return { loading, brawlers };
};
