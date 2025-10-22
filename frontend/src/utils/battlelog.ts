import type { GameModes } from "@/api/brawl-stars-api";
import type { PlayerBattlelog, PlayerInfo } from "@/api/official-api";

// Type definitions for player statistics
export type BasicStats = {
  victories: number;
  defeats: number;
  draws: number;
};

export type TrophiesProgression = {
  time: string;
  timestamp: Date;
  trophies: number | null;
};

export type MostPlayedGameModes = {
  gameMode: string;
  games: number;
};

export type BrawlerByTrophies = {
  id: number;
  name: string;
  highestTrophies: number;
};

export type NormalizedBattle = {
  map: {
    id: number;
    name: string | undefined;
  };
  type?: string;
  result?: string;
  trophyChange?: number;
  starPlayer?: {
    name: string;
    brawlerId: number;
  };
  teams?: {
    name: string;
    brawlerId: number;
  }[][];
  players?: {
    name: string;
    brawlerId: number | undefined;
  }[];
  mode: {
    scHash: string | undefined;
    imageUrl: string;
    bgColor: string;
    bgImg: string;
  } | null;
};

/**
 * Calculates basic battle statistics from a player's battle log
 * @param playerBattlelog - The player's battle log data
 * @returns Object containing counts of victories, defeats, and draws
 */
export const getBattleStats = (playerBattlelog: PlayerBattlelog | null): BasicStats => {
  const stats: BasicStats = { victories: 0, defeats: 0, draws: 0 };

  if (!playerBattlelog?.items) return stats;

  // Process each battle to count results
  for (const item of playerBattlelog.items) {
    const b = item.battle;
    if (!b) continue;

    let key: keyof BasicStats | null = null;

    // Determine result based on battle data
    if (typeof b.result === "string") {
      const r = b.result.toLowerCase();
      if (r === "victory") key = "victories";
      else if (r === "defeat") key = "defeats";
      else if (r === "draw") key = "draws";
    }

    // Fallback to trophy change if result is not available
    if (!key && typeof b.trophyChange === "number") {
      if (b.trophyChange > 0) key = "victories";
      else if (b.trophyChange < 0) key = "defeats";
      else key = "draws";
    }

    // Increment the appropriate stat counter
    if (key) stats[key] += 1;
  }

  return stats;
};

/**
 * Generates a trophy progression timeline from a player's battle log
 * @param playerBattlelog - The player's battle log data
 * @param currentTrophies - The player's current trophy count
 * @returns Array of trophy progression objects ordered chronologically
 */
export const getTrophiesProgression = (
  playerBattlelog: PlayerBattlelog | null,
  currentTrophies: number
): TrophiesProgression[] => {
  const progression: TrophiesProgression[] = [];

  if (!playerBattlelog?.items) return progression;

  // Process battles to reconstruct trophy history
  for (const item of playerBattlelog.items) {
    const battle = item.battle;

    if (!battle || typeof battle.trophyChange !== "number") continue;

    // Calculate previous trophy count before this battle
    const previous = currentTrophies - battle.trophyChange;

    progression.push({
      time: item.battleTime,
      timestamp: new Date(item.battleTime),
      trophies: previous,
    });

    // Update current trophies for next iteration
    currentTrophies = previous;
  }

  // Reverse to get chronological order (oldest first)
  return progression.reverse();
};

/**
 * Analyzes a player's battle log to determine most played game modes
 * @param playerBattlelog - The player's battle log data
 * @returns Array of game modes with play counts, sorted from most to least played
 */
export const getMostPlayedGameModes = (
  playerBattlelog: PlayerBattlelog | null
): MostPlayedGameModes[] => {
  const gameModes: MostPlayedGameModes[] = [];
  const modeCount: Record<string, number> = {};

  if (!playerBattlelog?.items) return gameModes;

  // Count occurrences of each game mode
  for (const item of playerBattlelog.items) {
    if (!item) continue;

    const battle = item.event;
    if (!battle) continue;

    // Format mode name by adding spaces between camelCase words
    const mode = battle.mode?.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
    if (!mode) continue;

    // Increment count for this game mode
    if (modeCount[mode]) {
      modeCount[mode] += 1;
    } else {
      modeCount[mode] = 1;
    }
  }

  // Convert count object to array of objects
  for (const mode in modeCount) {
    gameModes.push({ gameMode: mode, games: modeCount[mode] });
  }

  // Sort by game count in descending order
  return gameModes.sort((a, b) => b.games - a.games);
};

/**
 * Retrieves top 5 brawlers with highest trophy counts from player profile
 * @param playerInfo - The player's profile information containing brawler data
 * @returns Array of top 5 brawlers sorted by highest trophies, descending
 */
export const getTopBrawlersByTrophies = (playerInfo: PlayerInfo | null): BrawlerByTrophies[] => {
  const brawlers: BrawlerByTrophies[] = [];
  if (!playerInfo?.brawlers.length) return [];

  // Extract brawler data with trophy information
  for (const brawler of playerInfo.brawlers) {
    brawlers.push({ id: brawler.id, name: brawler.name, highestTrophies: brawler.highestTrophies });
  }

  // Sort by highest trophies and return top 5
  return brawlers.sort((a, b) => b.highestTrophies - a.highestTrophies).slice(0, 5);
};

/**
 * Normalizes battle log data by enriching it with game mode information
 * @param playerBattlelog - The player's battle log data
 * @param gameModes - Available game modes data
 * @returns Array of normalized battle objects
 */
export const getNormalizeBattlelog = (
  playerBattlelog: PlayerBattlelog | null,
  gameModes: GameModes | null
): NormalizedBattle[] => {
  if (!playerBattlelog?.items?.length) return [];

  // Map each battle item to normalized format
  return playerBattlelog.items.map((item) => {
    const { event, battle } = item;

    // Find matching game mode data
    const modeData = battle.mode && gameModes?.list.find((m) => m.scHash === battle.mode);

    return {
      map: {
        id: event.id,
        name: event.map ? event.map : undefined,
      },
      type: battle.type,
      result: battle.result,
      trophyChange: battle.trophyChange,
      starPlayer: battle.starPlayer
        ? {
            name: battle.starPlayer.name,
            brawlerId: battle.starPlayer.brawler.id,
          }
        : undefined,
      teams: battle.teams
        ? battle.teams.map((team) =>
            team.map((player) => ({
              name: player.name,
              brawlerId: player.brawler.id,
            }))
          )
        : undefined,
      players: battle.players
        ? battle.players.map((player) => ({
            name: player.name,
            brawlerId: player.brawler?.id,
          }))
        : undefined,
      mode: modeData
        ? {
            scHash: event.mode,
            imageUrl: modeData.imageUrl,
            bgColor: modeData.bgColor,
            bgImg: modeData.imageUrl2,
          }
        : null,
    };
  });
};
