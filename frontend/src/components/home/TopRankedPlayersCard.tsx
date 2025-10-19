import { useRankingPlayers } from "@/hooks";
import { BasicTag, Loader } from "../common";
import { PlayerTag } from "../ranks";
import { useNavigate } from "react-router-dom";

export const TopRankedPlayersCard = () => {
  const { loading, players } = useRankingPlayers();
  const navigate = useNavigate();

  if (loading)
    return (
    <div className="flex flex-col items-center justify-between h-full max-w-3xl gap-4 p-4 mb-4 border-2 shadow-md border-cyan-600 break-inside-avoid rounded-xl bg-gradient-to-br from-cyan-900 to-transparent shadow-neutral-950">
        <Loader />
      </div>
    );

  if (!players)
    return (
      <div className="flex items-center justify-center font-brawlstars font-extralight h-[500px]">
        Players not found :(
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-between h-full max-w-3xl gap-4 p-4 mb-4 border-2 shadow-md border-cyan-600 break-inside-avoid rounded-xl bg-gradient-to-br from-cyan-900 to-transparent shadow-neutral-950">
      <BasicTag
        iconId="icon-rank"
        iconClassName="text-cyan-400"
        size={50}
        title="Top 5 players"
        titleClassName="text-h4 text-cyan-400"
        subtitle="Top 5 players in the global ranking."
        subtitleClassName="text-h6 text-neutral-400"
        fontClassName="font-brawlstars font-extralight"
        className="w-full"
      />
      {players.slice(0, 5).map((p) => (
        <PlayerTag key={p.tag} player={p} />
      ))}

      <span
        className="flex items-center justify-center px-2 py-1 transition-all duration-300 ease-in-out border-2 cursor-pointer w-fit font-brawlstars border-neutral-900 bg-neutral-100 text-neutral-900 rounded-xl hover:bg-neutral-300"
        onClick={() => navigate("/ranks")}
      >
        View top players
      </span>
    </div>
  );
};
