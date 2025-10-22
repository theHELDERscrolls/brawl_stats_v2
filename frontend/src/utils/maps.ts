import type { MapDetail } from "@/api/brawl-stars-api";

/**
 * Groups maps by their game mode
 * @param maps - Array of map details to group
 * @returns Object with game mode names as keys and arrays of maps as values
 */
export const groupMapsByGameMode = (maps: MapDetail[]) => {
  // Object to store grouped maps
  const groupedMaps: Record<string, typeof maps> = {};

  // Iterate through each map and group by game mode
  for (const map of maps) {
    const key = map.gameMode.name;

    // Initialize array for new game modes
    if (!groupedMaps[key]) {
      groupedMaps[key] = [];
    }

    // Add map to the corresponding game mode group
    groupedMaps[key].push(map);
  }

  return groupedMaps;
};
