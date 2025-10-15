import { BasicTag } from "../../common";
import { useMediaQuery } from "@/hooks";
import type { BrawlerByTrophies } from "@/utils";

interface PlayerTopBrawlersProps {
  topBrawlers: BrawlerByTrophies[];
}

export const PlayerTopBrawlers = ({ topBrawlers }: PlayerTopBrawlersProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 425px)");

  return (
    <div
      className={`flex flex-col items-center h-[416px] justify-around p-2 rounded-xl bg-neutral-900/50 ${
        isSmallScreen ? "w-[266px]" : "w-[316px]"
      }`}
    >
      <p className="text-h5 font-brawlstars font-extralight text-amber-400">Most played brawlers</p>
      <div className="flex flex-col w-full gap-2">
        {topBrawlers.map((b, i) => (
          <div
            key={b.id}
            className="flex items-center w-full gap-2 px-2 rounded-xl bg-neutral-700/50"
          >
            <p
              className={`w-4 text-center text-p font-brawlstars font-extralight ${
                i === 0
                  ? "text-yellow-500"
                  : i === 1
                  ? "text-slate-500"
                  : i === 2
                  ? "text-amber-800"
                  : "text-neutral-100"
              }`}
            >
              {i + 1}
            </p>
            <BasicTag
              imgSrc={`https://cdn.brawlify.com/brawlers/borders/${b.id}.png`}
              title={b.name}
              titleClassName="text-h6 font-brawlstars font-extralight"
              subtitle={b.highestTrophies.toString()}
              subtitleClassName="text-amber-500/50 font-brawlstars font-extralight"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
