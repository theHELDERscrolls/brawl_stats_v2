import { PlayerService, type PlayerBattlelog } from "@/api/brawlstars";
import { useCallback, useEffect, useState } from "react";

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
