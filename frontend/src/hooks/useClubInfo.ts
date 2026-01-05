import { ClubService, type Club } from "@/api/official-api";
import { useCallback, useEffect, useState } from "react";

const SESSION_STORAGE_PREFIX = "club_info_";

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
      // Try to read cached club info from sessionStorage
      const cacheKey = SESSION_STORAGE_PREFIX + clubTag;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setClubInfo(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch club data from service
      const res = await ClubService.getClubInfo(clubTag);
      if (!res) return;

      // Update state with fetched club data
      setClubInfo(res);

      // Persist club info in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(res));
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
