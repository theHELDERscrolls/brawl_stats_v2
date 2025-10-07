import { PlayerService, type PlayerInfo } from "@/api";
import { useCallback, useEffect, useState } from "react";

export const usePlayerInfo = (playerTag: string | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);

  const fetchPlayerInfo = useCallback(async () => {
    if (playerTag === null) return;

    try {
      const res = await PlayerService.getPlayerInfo(playerTag);
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlayerInfo(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [playerTag]);

  useEffect(() => {
    fetchPlayerInfo();
  }, [fetchPlayerInfo]);

  return { loading, playerInfo };
};
