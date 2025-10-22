import { BasicTag } from "../common";
import { BrawlerCard, BrawlerSkeleton } from "../brawlers";
import { useBrawlerId, useGameModes } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useTopBrawler } from "@/pages/home/hooks";

export const BrawlerOfTheDayCard = () => {
  const navigate = useNavigate();

  const { gameModes } = useGameModes();
  const { loading: loadingTopBrawler, topBrawler } = useTopBrawler(gameModes);

  const { loading: loadingBrawlerData, bralwerData } = useBrawlerId(topBrawler?.id ?? null);

  return (
    <div className="flex flex-col items-center justify-between h-full max-w-3xl gap-4 p-4 mb-4 border-2 shadow-md shadow-neutral-950 border-neutral-600 break-inside-avoid rounded-xl bg-neutral-900">
      <BasicTag
        iconId="icon-star"
        iconClassName="text-yellow-400"
        size={50}
        title="Brawler of the day"
        titleClassName="text-h4 text-yellow-400"
        subtitle="Most used brawler based on results from top global players."
        subtitleClassName="text-h6 text-neutral-400"
        fontClassName="font-brawlstars font-extralight"
        className="w-full"
      />

      {loadingTopBrawler || loadingBrawlerData || !bralwerData ? (
        <BrawlerSkeleton />
      ) : (
        <BrawlerCard brawler={bralwerData} />
      )}

      <span
        className="flex items-center justify-center px-2 py-1 transition-all duration-300 ease-in-out border-2 cursor-pointer w-fit font-brawlstars border-neutral-900 bg-neutral-100 text-neutral-900 rounded-xl hover:bg-neutral-300"
        onClick={() => navigate("/brawlers")}
      >
        View all brawlers
      </span>
    </div>
  );
};
