import type { PlayerInfo } from "@/api/brawlstars";
import { BasicTag } from "@/components";
import type { NormalizedBattle } from "@/utils";

interface PlayerBattlesSectionProps {
  lastBattles: NormalizedBattle[];
  playerInfo: PlayerInfo;
}

export const PlayerResultsSection = ({
  lastBattles,
  playerInfo,
}: PlayerBattlesSectionProps) => {
  return (
    <section className="flex flex-col gap-2 py-2 border-t-2 border-neutral-700">
      <h2 className="w-full text-center text-h3 font-brawlstars font-extralight text-amber-400">
        Results
      </h2>
      {lastBattles.map((btt, i) => (
        <article key={i} className="flex flex-col drop-shadow-lg drop-shadow-neutral-950">
          <header
            className="flex items-center justify-center rounded-t-xl bg-neutral-700"
            style={{ backgroundColor: btt.mode?.bgColor }}
          >
            <BasicTag
              imgSrc={
                btt.mode?.imageUrl
                  ? btt.mode.imageUrl
                  : "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9xN1dqZ1c5TnU2YmM1N3BETkszSy5wbmcifQ:supercell:VpdnBBmcwsPsnYaAVkemztAUN4CRF2tgOjGvSgQaKxg?width=800"
              }
              imageClassName="h-10"
              title={
                btt.mode?.scHash
                  ? btt.mode.scHash.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()
                  : "Unknown Game Mode"
              }
              titleClassName="text-h6 drop-shadow-xs drop-shadow-neutral-950"
              fontClassName="font-brawlstars font-extralight"
              subtitle={btt.map.name}
              subtitleClassName="text-p drop-shadow-xs drop-shadow-neutral-950"
              className="w-full"
            />
            {btt.trophyChange && (
              <BasicTag
                iconId="icon-trophy"
                size={16}
                iconClassName="drop-shadow-xs drop-shadow-neutral-950"
                title={btt.trophyChange.toString()}
                fontClassName="font-brawlstars font-extralight"
                containerClassName={`shadow-xs border-1 border-neutral-950 gap-2 shadow-neutral-950 mr-2 flex items-center justify-center rounded-xl py-1 px-3 text-h5 text-shadow-xs text-shadow-neutral-950 ${
                  btt.trophyChange > 0
                    ? "bg-lime-600"
                    : btt.trophyChange < 0
                    ? "bg-red-600"
                    : "bg-neutral-100"
                }`}
              />
            )}
          </header>
          <main
            className="flex flex-col items-center justify-center gap-2 p-2 bg-neutral-700/50 rounded-b-xl"
            style={{
              backgroundImage: btt.mode?.bgImg ? `url(${btt.mode.bgImg})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {btt.teams?.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-full gap-2 shadow-md shadow-neutral-950 rounded-xl bg-neutral-600/95"
              >
                {t.map((player, i) => (
                  <BasicTag
                    key={i}
                    imgSrc={`https://cdn.brawlify.com/brawlers/borders/${player.brawlerId}.png`}
                    imageClassName={`h-13 rounded ${
                      player.name === btt.starPlayer?.name
                        ? "ring-4 ring-yellow-400 animate-pulse"
                        : ""
                    }`}
                    title={player.name}
                    titleClassName={`text-xs text-center bg-neutral-900 rounded p-1 ${
                      player.name === playerInfo.name ? "ring-2 ring-cyan-400" : ""
                    }`}
                    containerClassName="flex flex-col drop-shadow-xs drop-shadow-neutral-950 items-center justify-center w-full min-h-30 gap-2"
                  />
                ))}
              </div>
            ))}
            {btt.players && (
              <div className="flex flex-wrap items-center justify-center w-full gap-2 p-2 shadow-md rounded-b-xl shadow-neutral-950 rounded-xl bg-neutral-600/95">
                {btt.players.map((p, i) => (
                  <BasicTag
                    key={i}
                    imgSrc={`https://cdn.brawlify.com/brawlers/borders/${p.brawlerId}.png`}
                    imageClassName={`h-13 rounded ${
                      p.name === btt.starPlayer?.name ? "ring-4 ring-yellow-400 animate-pulse" : ""
                    }`}
                    title={p.name}
                    titleClassName={`text-xs text-center bg-neutral-900 rounded p-1 ${
                      p.name === playerInfo.name ? "ring-2 ring-cyan-400" : ""
                    }`}
                    containerClassName="flex flex-col drop-shadow-xs drop-shadow-neutral-950 items-center justify-center  min-h-30 gap-2 p-2"
                  />
                ))}
              </div>
            )}
          </main>
        </article>
      ))}
    </section>
  );
};
