import type { BrawlerDetail } from "@/api/brawl-stars-api";

// Define filter modes and group type
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
 * Groups and sorts brawlers based on filter mode, favorites, and search criteria
 * @param params - Parameters for filtering and grouping brawlers
 * @returns Object containing filtered brawlers and grouped results
 */
export const groupAndSortBrawlers = ({
  brawlers,
  filterMode,
  favorites,
  showFavorites,
  searchQuery,
}: Props) => {
  // Filter brawlers by search query (case-insensitive)
  let result = brawlers.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Further filter to show only favorites if enabled
  if (showFavorites) {
    result = result.filter((b) => favorites.includes(b.id));
  }

  // Handle Name filter mode (alphabetical sorting)
  if (filterMode === "Name") {
    const sorted = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return {
      filteredBrawlers: sorted,
      brawlersByGroup: [],
    };
  }

  // Handle Rarity filter mode (group by rarity)
  if (filterMode === "Rarity") {
    // Define rarity order for sorting
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

    // Group brawlers by rarity
    result.forEach((b) => {
      const existing = groups.find((g) => g.groupName === b.rarity.name);
      if (existing) {
        existing.brawlers.push(b);
      } else {
        groups.push({ groupName: b.rarity.name, brawlers: [b] });
      }
    });

    // Sort groups by rarity order
    groups.sort((a, b) => {
      const orderA = rarityOrder[a.groupName] ?? 99;
      const orderB = rarityOrder[b.groupName] ?? 99;
      return orderA - orderB;
    });

    // Sort brawlers alphabetically within each group
    groups.forEach((g) => g.brawlers.sort((a, b) => a.name.localeCompare(b.name)));

    return {
      filteredBrawlers: [],
      brawlersByGroup: groups,
    };
  }

  // Handle Class filter mode (group by class)
  if (filterMode === "Class") {
    // Define class order for sorting
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

    // Group brawlers by class
    result.forEach((b) => {
      const existing = groups.find((g) => g.groupName === b.class.name);
      if (existing) {
        existing.brawlers.push(b);
      } else {
        groups.push({ groupName: b.class.name, brawlers: [b] });
      }
    });

    // Sort groups by class order
    groups.sort((a, b) => {
      const orderA = classOrder[a.groupName] ?? 99;
      const orderB = classOrder[b.groupName] ?? 99;
      return orderA - orderB;
    });

    // Sort brawlers alphabetically within each group
    groups.forEach((g) => g.brawlers.sort((a, b) => a.name.localeCompare(b.name)));

    return {
      filteredBrawlers: [],
      brawlersByGroup: groups,
    };
  }

  // Default return for unknown filter modes
  return { filteredBrawlers: result, brawlersByGroup: [] };
};
