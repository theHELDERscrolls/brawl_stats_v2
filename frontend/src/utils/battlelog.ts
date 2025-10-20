import type { GameModes } from "@/api/brawl-stars-api";
import type { PlayerBattlelog, PlayerInfo } from "@/api/official-api";

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
 * Calculates basic battle statistics from a player's battle log.
 * Processes each battle to count victories, defeats, and draws based on result or trophy change.
 * @param {PlayerBattlelog | null} playerBattlelog - The player's battle log data
 * @returns {BasicStats} Object containing counts of victories, defeats, and draws
 */
export const getBattleStats = (playerBattlelog: PlayerBattlelog | null): BasicStats => {
  const stats: BasicStats = { victories: 0, defeats: 0, draws: 0 };

  if (!playerBattlelog?.items) return stats;

  for (const item of playerBattlelog.items) {
    const b = item.battle;
    if (!b) continue;

    let key: keyof BasicStats | null = null;

    if (typeof b.result === "string") {
      const r = b.result.toLowerCase();
      if (r === "victory") key = "victories";
      else if (r === "defeat") key = "defeats";
      else if (r === "draw") key = "draws";
    }

    if (!key && typeof b.trophyChange === "number") {
      if (b.trophyChange > 0) key = "victories";
      else if (b.trophyChange < 0) key = "defeats";
      else key = "draws";
    }

    if (key) stats[key] += 1;
  }

  return stats;
};

/**
 * Generates a trophy progression timeline from a player's battle log.
 * Reconstructs the player's trophy count history by processing battles in reverse chronological order.
 * @param {PlayerBattlelog | null} playerBattlelog - The player's battle log data
 * @param {number} currentTrophies - The player's current trophy count
 * @returns {TrophiesProgression[]} Array of trophy progression objects with timestamps, ordered chronologically
 */
export const getTrophiesProgression = (
  playerBattlelog: PlayerBattlelog | null,
  currentTrophies: number
): TrophiesProgression[] => {
  const progression: TrophiesProgression[] = [];

  if (!playerBattlelog?.items) return progression;

  for (const item of playerBattlelog.items) {
    const battle = item.battle;

    if (!battle || typeof battle.trophyChange !== "number") continue;

    const previous = currentTrophies - battle.trophyChange;

    progression.push({
      time: item.battleTime,
      timestamp: new Date(item.battleTime),
      trophies: previous,
    });

    currentTrophies = previous;
  }

  return progression.reverse();
};

/**
 * Analyzes a player's battle log to determine their most played game modes.
 * Counts occurrences of each game mode and returns them sorted by play count in descending order.
 * @param {PlayerBattlelog | null} playerBattlelog - The player's battle log data
 * @returns {MostPlayedGameModes[]} Array of game modes with their play counts, sorted from most to least played
 */
export const getMostPlayedGameModes = (
  playerBattlelog: PlayerBattlelog | null
): MostPlayedGameModes[] => {
  const gameModes: MostPlayedGameModes[] = [];
  const modeCount: Record<string, number> = {};

  if (!playerBattlelog?.items) return gameModes;

  for (const item of playerBattlelog.items) {
    if (!item) continue;

    const battle = item.event;
    if (!battle) continue;

    const mode = battle.mode?.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
    if (!mode) continue;

    if (modeCount[mode]) {
      modeCount[mode] += 1;
    } else {
      modeCount[mode] = 1;
    }
  }

  for (const mode in modeCount) {
    gameModes.push({ gameMode: mode, games: modeCount[mode] });
  }

  return gameModes.sort((a, b) => b.games - a.games);
};

/**
 * Retrieves the top 5 brawlers with the highest trophy counts from a player's profile.
 * Sorts all brawlers by their highest achieved trophy count in descending order and returns the top 5.
 * @param {PlayerInfo} playerInfo - The player's profile information containing brawler data
 * @returns {BrawlerByTrophies[]} Array of top 5 brawlers sorted by highest trophies, descending
 */
export const getTopBrawlersByTrophies = (playerInfo: PlayerInfo | null): BrawlerByTrophies[] => {
  const brawlers: BrawlerByTrophies[] = [];
  if (!playerInfo?.brawlers.length) return [];

  for (const brawler of playerInfo.brawlers) {
    brawlers.push({ id: brawler.id, name: brawler.name, highestTrophies: brawler.highestTrophies });
  }

  return brawlers.sort((a, b) => b.highestTrophies - a.highestTrophies).slice(0, 5);
};

/**
 * Normalizes battle log data by enriching it with game mode information.
 * @param {PlayerBattlelog | null} playerBattlelog - The player's battle log data.
 * @param {GameModes | null} gameModes - Available game modes data.
 * @returns {NormalizedBattle[]} Array of normalized battle objects.
 */

export const getNormalizeBattlelog = (
  playerBattlelog: PlayerBattlelog | null,
  gameModes: GameModes | null
): NormalizedBattle[] => {
  if (!playerBattlelog?.items?.length) return [];

  return playerBattlelog.items.map((item) => {
    const { event, battle } = item;

    const modeData = battle.mode && gameModes?.list.find((m) => m.scHash === battle.mode);

    return {
      map: {
        id: event.id,
        name: event.map ? event.map : undefined,
      },
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
