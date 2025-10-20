import { RankingService, type GlobalClub } from "@/api/official-api";
import { useEffect, useState } from "react";

/**
 * Custom hook that fetches and returns the global club ranking data.
 *
 * @module useRankingClubs
 * @returns {Object} An object containing the loading state and clubs array
 * @property {boolean} loading - Indicates if the data is currently being fetched
 * @property {Array<GlobalClub>} clubs - Array of global club ranking data
 */
export const useRankingClubs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [clubs, setClubs] = useState<GlobalClub[]>([]);

  const fetchRankingClubs = async () => {
    try {
      const res = await RankingService.getRankingClubs();
      if (!res) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClubs(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingClubs();
  }, []);

  return { loading, clubs };
};
