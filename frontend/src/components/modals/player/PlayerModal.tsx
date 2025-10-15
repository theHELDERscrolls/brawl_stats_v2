import { BasicTag, Loader } from "../../common";
import { PlayerInfoSection, PlayerResultsSection } from "../player";
import { useBattlelog, useGameModes, usePlayerInfo } from "@/hooks";
import { useBrawlers } from "@/pages/brawlers";
import {
  getBattleStats,
  getMostPlayedGameModes,
  getNormalizeBattlelog,
  getTrophiesProgression,
} from "@/utils";
import React from "react";

const PlayerStatsCharts = React.lazy(() => import("../player/PlayerStatsCharts"));

interface PlayerModalProps {
  playerTag: string;
}

export const PlayerModal = ({ playerTag }: PlayerModalProps) => {
  const { playerInfo, loading: loadingPlayerInfo } = usePlayerInfo(playerTag);
  const { playerBattlelog, loading: loadingBattlelog } = useBattlelog(playerTag);

  const { brawlers } = useBrawlers();
  const { gameModes } = useGameModes();

  const stats = getBattleStats(playerBattlelog);

  const trophiesProgression = getTrophiesProgression(playerBattlelog, playerInfo?.trophies ?? 0);

  const mostPlayedGameModes = getMostPlayedGameModes(playerBattlelog);

  const lastBattles = getNormalizeBattlelog(playerBattlelog, gameModes);

  if (loadingPlayerInfo || loadingBattlelog) return <Loader />;
  if (!playerInfo || !playerBattlelog)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl text-h4 font-brawlstars font-extralight text-neutral-100 bg-neutral-800 rounded-xl">
        Data not found :(
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full max-w-3xl gap-4 p-4 overflow-y-auto sm:p-4 text-neutral-100 bg-neutral-800 rounded-xl custom-scrollbar">
      <BasicTag
        imgSrc={`https://cdn.brawlify.com/profile-icons/regular/${playerInfo.icon.id.toString()}.png`}
        title={playerInfo.name}
        subtitle={playerInfo.tag}
        imageClassName="h-20 sm:h-30"
        titleClassName="text-h3 text-neutral-100 drop-shadow-xs drop-shadow-neutral-950 font-bold"
        subtitleClassName="text-h4 text-cyan-400 drop-shadow-xs drop-shadow-neutral-950"
      />
      {/* Basic info */}
      <PlayerInfoSection playerInfo={playerInfo} totalBrawlers={brawlers.length} />

      {/* Graphics section */}
      <section className="flex flex-col items-center justify-around gap-2 py-2 border-t-2 border-neutral-700">
        <h2 className="text-h3 font-brawlstars font-extralight text-amber-400">
          Last {playerBattlelog.items.length.toString()} battles
        </h2>

        <React.Suspense fallback={<Loader />}>
          <PlayerStatsCharts
            stats={stats}
            trophiesProgression={trophiesProgression}
            mostPlayedGameModes={mostPlayedGameModes}
            playerInfo={playerInfo}
          />
        </React.Suspense>
      </section>

      {/* Results section */}
      <PlayerResultsSection lastBattles={lastBattles} playerInfo={playerInfo} />
    </div>
  );
};
