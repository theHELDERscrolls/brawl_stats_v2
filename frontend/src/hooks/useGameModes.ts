import { GameModeService, type GameModes } from "@/api/brawlapi";
import { useEffect, useState } from "react";

/**
 * Fetches all available game modes.
 * @returns {{loading: boolean, gameModes: GameModes|null}} Object containing loading state and game modes data.
 */
export const useGameModes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gameModes, setGameModes] = useState<GameModes | null>(null);

  const fetchGameModes = async () => {
    try {
      const res = await GameModeService.getAllGameModes();
      if (!res) return;

      setGameModes(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameModes();
  }, []);

  return { loading, gameModes };
};
