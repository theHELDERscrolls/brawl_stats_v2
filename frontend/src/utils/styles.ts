import type { BrawlerDetail } from "@/api";

/**
 * Determines the appropriate CSS classes for a brawler based on its rarity.
 *
 * This utility function maps brawler rarity levels to corresponding CSS class names
 * that define background colors. It provides different styles for default and hover states,
 * with a fallback to neutral background if rarity is not recognized.
 *
 * @param {BrawlerDetail} brawler - The brawler object containing rarity information
 * @returns {string} CSS class names corresponding to the brawler's rarity
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
      : "bg-neutral-900";

  return rarityClass;
};

/**
 * Returns the corresponding Tailwind CSS shadow class based on brawler rarity.
 * @param {BrawlerDetail} brawler - The brawler detail object containing rarity information.
 * @returns {string} Tailwind CSS class for the rarity-specific shadow style.
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
      : "hover:shadow-md hover:shadow-neutral-900";

  return rarityClass;
};
