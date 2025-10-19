import { useRankingClubs } from "@/hooks";
import { BasicTag, Loader } from "../common";
import { ClubTag } from "../ranks";
import { useNavigate } from "react-router-dom";

export const TopRankedClubsCard = () => {
  const navigate = useNavigate();
  const { loading, clubs } = useRankingClubs();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-between max-w-3xl gap-4 p-4 mb-4 border-2 shadow-md shadow-neutral-950 border-amber-600 break-inside-avoid rounded-xl bg-gradient-to-br from-amber-900 to-transparent  h-[500px]">
        <Loader />
      </div>
    );

  if (!clubs)
    return (
      <div className="flex items-center justify-center font-brawlstars font-extralight">
        Clubs not found :(
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-between h-full max-w-3xl gap-4 p-4 mb-4 border-2 shadow-md shadow-neutral-950 border-amber-600 break-inside-avoid rounded-xl bg-gradient-to-br from-amber-900 to-transparent">
      <BasicTag
        iconId="icon-rank"
        iconClassName="text-amber-400"
        size={50}
        title="Top 5 clubs"
        titleClassName="text-h4 text-amber-400"
        subtitle="Top 5 clubs in the global ranking."
        subtitleClassName="text-h6 text-neutral-400"
        fontClassName="font-brawlstars font-extralight"
        className="w-full"
      />

      {clubs.slice(0, 5).map((c) => (
        <ClubTag key={c.tag} club={c} showDetails={false} />
      ))}

      <span
        className="flex items-center justify-center px-2 py-1 transition-all duration-300 ease-in-out border-2 cursor-pointer w-fit font-brawlstars border-neutral-900 bg-neutral-100 text-neutral-900 rounded-xl hover:bg-neutral-300"
        onClick={() => navigate("/ranks")}
      >
        View top clubs
      </span>
    </div>
  );
};
