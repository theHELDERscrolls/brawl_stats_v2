import { groupAndSortBrawlers } from "@/utils/brawlers";
import { useMemo, useState } from "react";
import type { BrawlerDetail } from "@/api/brawl-stars-api";

// Define available filter modes
type FilterMode = "Name" | "Class" | "Rarity";

/**
 * Custom hook for filtering, grouping, and sorting brawlers
 * Manages filter state and provides processed brawler data
 * @param brawlers - Complete list of brawlers to filter and group
 * @param favorites - Array of favorite brawler IDs
 * @param showFavorites - Flag to show only favorite brawlers
 * @returns Object containing filter state and processed brawler data
 */
export const useBrawlerFilters = (
  brawlers: BrawlerDetail[],
  favorites: number[],
  showFavorites: boolean
) => {
  // State for current filter mode
  const [filterMode, setFilterMode] = useState<FilterMode>("Name");
  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function to cycle through filter modes
  const cycleFilterMode = (current: FilterMode) => {
    const modes: FilterMode[] = ["Name", "Class", "Rarity"];
    const index = modes.indexOf(current);
    // Calculate next mode index with wrap-around
    const nextIndex = (index + 1) % modes.length;
    setFilterMode(modes[nextIndex]);
  };

  // Memoized processing of brawlers based on current filters
  const { filteredBrawlers, brawlersByGroup } = useMemo(
    () =>
      groupAndSortBrawlers({
        brawlers,
        filterMode,
        favorites,
        showFavorites,
        searchQuery,
      }),
    [brawlers, filterMode, favorites, showFavorites, searchQuery]
  );

  // Return all filter state and processed data
  return {
    filterMode,
    cycleFilterMode,
    searchQuery,
    setSearchQuery,
    filteredBrawlers,
    brawlersByGroup,
  };
};

// Type export for hook return value
export type UseBrawlerFiltersReturn = ReturnType<typeof useBrawlerFilters>;
