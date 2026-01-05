import { RankingService, type GlobalClub } from "@/api/official-api";
import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "ranking_clubs";

/**
 * Custom hook to fetch and manage global club ranking data
 * @returns Object containing loading state and clubs array
 */
export const useRankingClubs = () => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing club ranking data
  const [clubs, setClubs] = useState<GlobalClub[]>([]);

  // Function to fetch club ranking data
  const fetchRankingClubs = async () => {
    try {
      // Try to read cached ranking clubs from sessionStorage
      const cached = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (cached) {
        setClubs(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch club rankings from service
      const res = await RankingService.getRankingClubs();
      if (!res) return;

      // Update state with club items from response
      setClubs(res.items);

      // Persist ranking clubs in sessionStorage
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(res.items));
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Effect to trigger data fetch on component mount
  useEffect(() => {
    fetchRankingClubs();
  }, []); // Empty dependency array - runs only once

  // Return loading state and clubs data
  return { loading, clubs };
};
