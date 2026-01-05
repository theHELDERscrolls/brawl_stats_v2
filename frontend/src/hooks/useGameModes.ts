import { GameModeService, type GameModes } from "@/api/brawl-stars-api";
import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "game_modes";

/**
 * Custom hook to fetch and manage game modes data
 * @returns Object containing loading state and game modes data
 */
export const useGameModes = () => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing game modes data
  const [gameModes, setGameModes] = useState<GameModes | null>(null);

  // Function to fetch game modes data
  const fetchGameModes = async () => {
    try {
      // Try to read cached game modes from sessionStorage
      const cached = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (cached) {
        setGameModes(JSON.parse(cached));
        return;
      }

      // Fetch game modes from service
      const res = await GameModeService.getAllGameModes();
      if (!res) return;

      // Update state with fetched game modes
      setGameModes(res);

      // Persist game modes in sessionStorage to avoid refetching
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(res));
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Effect to trigger data fetch on component mount
  useEffect(() => {
    fetchGameModes();
  }, []); // Empty dependency array - runs only once

  // Return loading state and game modes data
  return { loading, gameModes };
};
