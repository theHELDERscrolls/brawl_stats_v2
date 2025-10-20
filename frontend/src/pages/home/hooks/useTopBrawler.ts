import { useCallback, useEffect, useState } from "react";
import { RankingService, PlayerService } from "@/api/official-api";
import { getNormalizeBattlelog } from "@/utils";
import type { GameModes } from "@/api/brawl-stars-api";

type TopBrawler = {
  id: number;
  count: number;
};

/**
 * Calculates the most played brawler based on battle logs from the top 10 global players.
 * Fetches player rankings, retrieves their battle logs, and analyzes brawler usage frequency.
 * @param {GameModes | null} gameModes - Game modes data for normalizing battle logs.
 * @returns {{loading: boolean, topBrawler: TopBrawler|null}} Object containing loading state and top brawler data.
 */
export const useTopBrawler = (gameModes: GameModes | null) => {
  const [loading, setLoading] = useState(true);
  const [topBrawler, setTopBrawler] = useState<TopBrawler | null>(null);

  const fetchTopBrawler = useCallback(async () => {
    try {
      // Fetch global player rankings
      const ranking = await RankingService.getRankingPlayers();
      if (!ranking?.items) return;

      // Get top 10 players from the ranking
      const topPlayers = ranking.items.slice(0, 5);

      // Fetch battle logs for all top players concurrently
      const battlelogs = await Promise.allSettled(
        topPlayers.map((p) => {
          const cleanTag = p.tag.replace("#", "");
          return PlayerService.getPlayerBattlelog(cleanTag);
        })
      );

      // Object to count brawler appearances across all battles
      const counts: Record<number, { name: string; count: number }> = {};
      // counts = {
      //   16000001: { name: "SHELLY", count: 12 },
      //   16000010: { name: "SPIKE", count: 7 },
      //   16000023: { name: "EDGAR", count: 4 },
      // };

      // Process each player's battle log
      for (const result of battlelogs) {
        // Skip failed API calls
        if (result.status !== "fulfilled" || !result.value) continue;

        // Normalize battle log data for consistent processing
        const normalized = getNormalizeBattlelog(result.value, gameModes);

        // Count brawler appearances in team battles
        for (const battle of normalized) {
          if (battle.teams) {
            // battle.teams = [
            //   [
            //     { name: "Alice", brawlerId: 1 },
            //     { name: "Bob", brawlerId: 2 },
            //     { name: "Carol", brawlerId: 3 },
            //   ],
            //   [
            //     { name: "Dave", brawlerId: 4 },
            //     { name: "Eve", brawlerId: 5 },
            //     { name: "Frank", brawlerId: 6 },
            //   ],
            // ];

            const allPlayers = battle.teams.flat(); // flatten teams array
            // [
            //   { name: "Alice", brawlerId: 1 },
            //   { name: "Bob", brawlerId: 2 },
            //   { name: "Carol", brawlerId: 3 },
            //   { name: "Dave", brawlerId: 4 },
            //   { name: "Eve", brawlerId: 5 },
            //   { name: "Frank", brawlerId: 6 },
            // ];

            for (const player of allPlayers) {
              if (!player.brawlerId) continue;
              const current = counts[player.brawlerId];

              counts[player.brawlerId] = {
                name: player.name,
                count: current ? current.count + 1 : 1,
              };
            }
          }

          // Count brawler appearances in solo battles
          if (battle.players) {
            for (const player of battle.players) {
              if (!player.brawlerId) continue;
              const current = counts[player.brawlerId];

              counts[player.brawlerId] = {
                name: player.name,
                count: current ? current.count + 1 : 1,
              };
            }
          }
        }
      }

      // Sort brawlers by usage count in descending order
      const entries = Object.entries(counts); // [['16000001', {name: 'SHELLY', count: 12}], ...]
      const sortedEntries = entries.sort((a, b) => {
        const aCount = a[1].count;
        const bCount = b[1].count;
        return bCount - aCount; // highest count first
      });

      // Transform into a clean array of { id, name, count }
      const sorted = sortedEntries.map((entry) => {
        const id = Number(entry[0]);
        const { name, count } = entry[1];
        return { id, name, count };
      });

      // Set the most played brawler (first in sorted array)
      setTopBrawler(sorted[0] ?? null);
    } catch (error) {
      console.error("Error fetching top brawler:", error);
    } finally {
      setLoading(false);
    }
  }, [gameModes]);

  useEffect(() => {
    fetchTopBrawler();
  }, [fetchTopBrawler]);

  return { loading, topBrawler };
};
