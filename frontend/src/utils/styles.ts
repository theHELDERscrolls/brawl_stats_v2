import type { BrawlerDetail } from "@/api";

/**
 * Determines CSS classes for brawler background based on rarity
 * @param brawler - The brawler object containing rarity information
 * @returns CSS class names corresponding to the brawler's rarity
 */
export const rarityBackgroundStyle = (brawler: BrawlerDetail): string => {
  const rarityClass =
    brawler.rarity.name === "Common"
      ? "bg-common lg:bg-neutral-900 lg:hover:bg-common"
      : brawler.rarity.name === "Rare"
      ? "bg-rare lg:bg-neutral-900 lg:hover:bg-rare"
      : brawler.rarity.name === "Super Rare"
      ? "bg-super-rare lg:bg-neutral-900 lg:hover:bg-super-rare"
      : brawler.rarity.name === "Epic"
      ? "bg-epic lg:bg-neutral-900 lg:hover:bg-epic"
      : brawler.rarity.name === "Mythic"
      ? "bg-mythic lg:bg-neutral-900 lg:hover:bg-mythic"
      : brawler.rarity.name === "Legendary"
      ? "bg-legendary lg:bg-neutral-900 lg:hover:bg-legendary"
      : brawler.rarity.name === "Ultra Legendary"
      ? "bg-ultra-legendary lg:bg-neutral-900 lg:hover:bg-ultra-legendary"
      : "bg-neutral-900"; // Fallback for unknown rarities

  return rarityClass;
};

/**
 * Returns Tailwind CSS shadow class based on brawler rarity
 * @param brawler - The brawler detail object containing rarity information
 * @returns Tailwind CSS class for rarity-specific shadow style
 */
export const rarityShadowStyle = (brawler: BrawlerDetail): string => {
  const rarityClass =
    brawler.rarity.name === "Common"
      ? "hover:shadow-md hover:shadow-common"
      : brawler.rarity.name === "Rare"
      ? "hover:shadow-md hover:shadow-rare"
      : brawler.rarity.name === "Super Rare"
      ? "hover:shadow-md hover:shadow-super-rare"
      : brawler.rarity.name === "Epic"
      ? "hover:shadow-md hover:shadow-epic"
      : brawler.rarity.name === "Mythic"
      ? "hover:shadow-md hover:shadow-mythic"
      : brawler.rarity.name === "Legendary"
      ? "hover:shadow-md hover:shadow-legendary"
      : brawler.rarity.name === "Ultra Legendary"
      ? "hover:shadow-md hover:shadow-ultra-legendary"
      : "hover:shadow-md hover:shadow-neutral-900"; // Fallback for unknown rarities

  return rarityClass;
};
