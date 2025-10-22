import { RankingService, type GlobalClub } from "@/api/official-api";
import { useEffect, useState } from "react";

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
      // Fetch club rankings from service
      const res = await RankingService.getRankingClubs();
      if (!res) return;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update state with club items from response
      setClubs(res.items);
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
