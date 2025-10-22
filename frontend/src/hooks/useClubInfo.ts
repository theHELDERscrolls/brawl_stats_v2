import { ClubService, type Club } from "@/api/official-api";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook to fetch and manage club information by tag
 * @param clubTag - The club tag to fetch information for (null for no fetch)
 * @returns Object containing loading state and club data
 */
export const useClubInfo = (clubTag: string | null) => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing club information
  const [clubInfo, setClubInfo] = useState<Club | null>(null);

  // Memoized function to fetch club information
  const fetchClubInfo = useCallback(async () => {
    // Skip fetch if no club tag provided
    if (clubTag === null) return;

    try {
      // Fetch club data from service
      const res = await ClubService.getClubInfo(clubTag);
      if (!res) return;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update state with fetched club data
      setClubInfo(res);
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  }, [clubTag]);

  // Effect to trigger data fetch when clubTag changes
  useEffect(() => {
    fetchClubInfo();
  }, [fetchClubInfo]);

  // Return loading state and club information
  return { loading, clubInfo };
};
