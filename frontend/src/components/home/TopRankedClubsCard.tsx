import { BasicTag } from "../common";
import { ClubTag } from "../ranks";
import { SkeletonBasicTag } from "../common/SkeletonBasicTag";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePopup, useRankingClubs } from "@/hooks";

export const TopRankedClubsCard = () => {
  const navigate = useNavigate();
  const { loading, clubs } = useRankingClubs();
  const { popup, showPopup } = usePopup();

  const showSkeleton = loading || !clubs || clubs.length === 0;

  useEffect(() => {
    if (!loading && (!clubs || clubs.length === 0)) {
      showPopup("Data could not be loaded. Please try again later.", "error");
    }
  }, [clubs, loading, showPopup]);

  return (
    <div className="flex flex-col items-center justify-between h-full max-w-3xl gap-4 p-4 mb-4 border-2 shadow-md shadow-neutral-950 border-amber-600 break-inside-avoid rounded-xl bg-gradient-to-br from-amber-900 to-transparent">
      {popup}
      <BasicTag
        iconId="icon-club"
        iconClassName="text-amber-400"
        size={50}
        title="Top 5 clubs"
        titleClassName="text-h4 text-amber-400"
        subtitle="Top 5 clubs in the global ranking."
        subtitleClassName="text-h6 text-neutral-400"
        fontClassName="font-brawlstars font-extralight"
        className="w-full"
      />

      {showSkeleton ? (
        <SkeletonBasicTag count={5} />
      ) : (
        clubs?.slice(0, 5).map((c) => <ClubTag key={c.tag} club={c} showDetails={false} />)
      )}

      <span
        className="flex items-center justify-center px-2 py-1 transition-all duration-300 ease-in-out border-2 cursor-pointer w-fit font-brawlstars border-neutral-900 bg-neutral-100 text-neutral-900 rounded-xl hover:bg-neutral-300"
        onClick={() => navigate("/ranks")}
      >
        View top clubs
      </span>
    </div>
  );
};
