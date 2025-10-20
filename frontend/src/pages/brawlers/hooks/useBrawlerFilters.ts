import { groupAndSortBrawlers } from "@/utils/brawlers";
import { useMemo, useState } from "react";
import type { BrawlerDetail } from "@/api/brawl-stars-api";

type FilterMode = "Name" | "Class" | "Rarity";

/**
 * Custom React hook for filtering, grouping, and sorting brawlers based on various criteria.
 *
 * This hook manages filter state and provides processed brawler data by delegating to the
 * groupAndSortBrawlers utility function. It handles search queries, favorite filtering,
 * and different grouping modes with optimized memoization to prevent unnecessary recalculations.
 *
 * @param {BrawlerDetail[]} brawlers - The complete list of brawlers to be filtered and grouped.
 * @param {number[]} favorites - Array of favorite brawler IDs used for filtering when showFavorites is true.
 * @param {boolean} showFavorites - Flag indicating whether to show only favorite brawlers.
 *
 * @returns {Object} An object containing filter state and processed brawler data.
 * @returns {FilterMode} return.filterMode - The current active filter mode ("Name", "Class", or "Rarity").
 * @returns {Function} return.cycleFilterMode - Function to cycle to the next filter mode.
 * @param {FilterMode} return.cycleFilterMode.current - The current filter mode to cycle from.
 * @returns {string} return.searchQuery - The current search query string.
 * @returns {Function} return.setSearchQuery - Function to update the search query.
 * @returns {BrawlerDetail[]} return.filteredBrawlers - The filtered and sorted list of brawlers (populated for "Name" mode).
 * @returns {BrawlerGroup[]} return.brawlersByGroup - Brawlers grouped by category (populated for "Class" and "Rarity" modes).
 */
export const useBrawlerFilters = (
  brawlers: BrawlerDetail[],
  favorites: number[],
  showFavorites: boolean
) => {
  const [filterMode, setFilterMode] = useState<FilterMode>("Name");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const cycleFilterMode = (current: FilterMode) => {
    const modes: FilterMode[] = ["Name", "Class", "Rarity"];
    const index = modes.indexOf(current);
    const nextIndex = (index + 1) % modes.length;
    setFilterMode(modes[nextIndex]);
  };

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

  return {
    filterMode,
    cycleFilterMode,
    searchQuery,
    setSearchQuery,
    filteredBrawlers,
    brawlersByGroup,
  };
};

export type UseBrawlerFiltersReturn = ReturnType<typeof useBrawlerFilters>;
