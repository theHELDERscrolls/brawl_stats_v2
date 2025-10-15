import type { MapDetail } from "@/api/brawlapi";

export const groupMapsByGameMode = (maps: MapDetail[]) => {
  const groupedMaps: Record<string, typeof maps> = {};

  for (const map of maps) {
    const key = map.gameMode.name;

    if (!groupedMaps[key]) {
      groupedMaps[key] = [];
    }

    groupedMaps[key].push(map);
  }

  return groupedMaps;
};
