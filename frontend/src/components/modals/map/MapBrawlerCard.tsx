import { BasicTag } from "@/components/common";

interface MapBrawlerCardProps {
  brawler?: { id: number; name: string; imageUrl: string };
  winRate: number;
  useRate: number;
}

export const MapBrawlerCard = ({ brawler, winRate, useRate }: MapBrawlerCardProps) => {
  return (
    <div
      key={brawler?.id}
      className="flex-none flex flex-col items-center justify-center border-2 p-2 gap-1 min-w-40 border-neutral-500 rounded-xl bg-neutral-700/50 font-brawlstars font-extralight"
    >
      <BasicTag
        imgSrc={brawler?.imageUrl}
        title={brawler?.name}
        titleClassName="text-h5"
        fontClassName="font-brawlstars font-extralight"
        className="w-full"
      />

      <div className="flex flex-col w-full items-center justify-center gap-1">
        <p className="text-p text-cyan-400">Win rate: {winRate}%</p>
        <div className="relative rounded-full h-2 bg-neutral-600 w-full">
          <span
            className="absolute bg-cyan-500 h-full rounded-full"
            style={{ width: `${winRate}%` }}
          ></span>
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-center gap-1">
        <p className="text-p text-emerald-400">Use rate: {useRate}%</p>
        <div className="relative rounded-full h-2 bg-neutral-600 w-full">
          <span
            className="absolute bg-emerald-500 h-full rounded-full"
            style={{ width: `${useRate * 10}%` }}
          ></span>
        </div>
      </div>
    </div>
  );
};
