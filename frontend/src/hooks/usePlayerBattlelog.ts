import { PlayerService, type PlayerBattlelog } from "@/api/brawlstars";
import { useCallback, useEffect, useState } from "react";

/**
 * Fetches player battlelog for a given player tag.
 * @param {string|null} playerTag - The player tag to fetch battlelog for.
 * @returns {{loading: boolean, playerBattlelog: PlayerBattlelog|null}} Object containing loading state and battlelog data.
 */
export const useBattlelog = (playerTag: string | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [playerBattlelog, setPlayerBattlelog] = useState<PlayerBattlelog | null>(null);

  const fetchPlayerBattlelog = useCallback(async () => {
    if (playerTag === null) return;

    try {
      const res = await PlayerService.getPlayerBattlelog(playerTag);
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlayerBattlelog(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [playerTag]);

  useEffect(() => {
    fetchPlayerBattlelog();
  }, [fetchPlayerBattlelog]);

  return { loading, playerBattlelog };
};
