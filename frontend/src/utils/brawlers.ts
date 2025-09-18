import type { BrawlerDetail } from "@/api/brawlapi";

type FilterMode = "Name" | "Class" | "Rarity";

type BrawlerGroup = {
  groupName: string;
  brawlers: BrawlerDetail[];
};

interface Props {
  brawlers: BrawlerDetail[];
  filterMode: FilterMode;
  favorites: number[];
  showFavorites: boolean;
  searchQuery: string;
}

/**
 * Groups and sorts brawlers based on the specified filter mode, favorites, and search criteria.
 *
 * This utility function processes a list of brawlers by applying search filtering, favorite filtering,
 * and then organizing them according to the selected filter mode. It returns both a flat filtered list
 * and grouped results depending on the filter mode.
 *
 * @param {Object} params - The parameters object.
 * @param {BrawlerDetail[]} params.brawlers - The complete list of brawlers to process.
 * @param {FilterMode} params.filterMode - The grouping mode to apply ("Name", "Class", or "Rarity").
 * @param {number[]} params.favorites - Array of favorite brawler IDs for favorite filtering.
 * @param {boolean} params.showFavorites - Whether to filter results to show only favorite brawlers.
 * @param {string} params.searchQuery - The search string to filter brawlers by name (case-insensitive).
 *
 * @returns {Object} An object containing the processed brawler data.
 * @returns {BrawlerDetail[]} return.filteredBrawlers - Flat sorted list of brawlers (only populated for "Name" mode).
 * @returns {BrawlerGroup[]} return.brawlersByGroup - Array of grouped brawlers (only populated for "Class" and "Rarity" modes).
 */
export const groupAndSortBrawlers = ({
  brawlers,
  filterMode,
  favorites,
  showFavorites,
  searchQuery,
}: Props) => {
  let result = brawlers.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (showFavorites) {
    result = result.filter((b) => favorites.includes(b.id));
  }

  if (filterMode === "Name") {
    const sorted = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return {
      filteredBrawlers: sorted,
      brawlersByGroup: [],
    };
  }

  if (filterMode === "Rarity") {
    const rarityOrder: Record<string, number> = {
      Common: 1,
      Rare: 2,
      "Super Rare": 3,
      Epic: 4,
      Mythic: 5,
      Legendary: 6,
      "Ultra Legendary": 7,
    };

    const groups: BrawlerGroup[] = [];

    result.forEach((b) => {
      const existing = groups.find((g) => g.groupName === b.rarity.name);
      if (existing) {
        existing.brawlers.push(b);
      } else {
        groups.push({ groupName: b.rarity.name, brawlers: [b] });
      }
    });

    groups.sort((a, b) => {
      const orderA = rarityOrder[a.groupName] ?? 99;
      const orderB = rarityOrder[b.groupName] ?? 99;
      return orderA - orderB;
    });

    groups.forEach((g) => g.brawlers.sort((a, b) => a.name.localeCompare(b.name)));

    return {
      filteredBrawlers: [],
      brawlersByGroup: groups,
    };
  }

  if (filterMode === "Class") {
    const classOrder: Record<string, number> = {
      Tank: 1,
      Assassin: 2,
      Support: 3,
      Controller: 4,
      "Damage Dealer": 5,
      Marksman: 6,
      Artillery: 7,
      Unknown: 8,
    };

    const groups: BrawlerGroup[] = [];

    result.forEach((b) => {
      const existing = groups.find((g) => g.groupName === b.class.name);
      if (existing) {
        existing.brawlers.push(b);
      } else {
        groups.push({ groupName: b.class.name, brawlers: [b] });
      }
    });

    groups.sort((a, b) => {
      const orderA = classOrder[a.groupName] ?? 99;
      const orderB = classOrder[b.groupName] ?? 99;
      return orderA - orderB;
    });

    groups.forEach((g) => g.brawlers.sort((a, b) => a.name.localeCompare(b.name)));

    return {
      filteredBrawlers: [],
      brawlersByGroup: groups,
    };
  }

  return { filteredBrawlers: result, brawlersByGroup: [] };
};
