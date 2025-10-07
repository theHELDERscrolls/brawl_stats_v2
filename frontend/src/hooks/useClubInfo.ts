import { ClubService, type Club } from "@/api/brawlstars";
import { useCallback, useEffect, useState } from "react";

export const useClubInfo = (clubTag: string | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [clubInfo, setClubInfo] = useState<Club | null>(null);

  const fetchClubInfo = useCallback(async () => {
    if (clubTag === null) return;

    try {
      const res = await ClubService.getClubInfo(clubTag);
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClubInfo(res);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [clubTag]);

  useEffect(() => {
    fetchClubInfo();
  }, [fetchClubInfo]);

  return { loading, clubInfo };
};
