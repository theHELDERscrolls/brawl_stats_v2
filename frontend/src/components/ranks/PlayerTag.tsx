import { BasicTag, RankedTagBase } from "@/components";

interface Player {
  tag: string;
  rank: number;
  name: string;
  trophies: number;
  icon: { id: number };
  club?: { name: string };
}

interface PlayerTagProps {
  player: Player;
  variant?: "default" | "withClub" | "withTrophies";
  showDetails?: boolean;
}

export const PlayerTag = ({ player, variant = "default", showDetails = true }: PlayerTagProps) => {
  let extra = null;

  if (showDetails) {
    if (variant === "withClub") {
      extra = player.club?.name ? (
        <BasicTag
          iconId="icon-club"
          iconClassName="text-neutral-400"
          title={player.club.name}
          subtitle="Club:"
          className="w-full pl-4 border-l-2 border-neutral-600"
          reverse
        />
      ) : (
        <div className="w-full"></div>
      );
    }

    if (variant === "withTrophies") {
      extra = (
        <BasicTag
          iconId="icon-trophy"
          iconClassName="text-amber-500/50 group-hover:text-amber-500 transition-all ease-in-out"
          title={player.trophies.toString()}
          titleClassName="font-brawlstars font-extralight text-amber-500/50 group-hover:text-amber-500 transition-all ease-in-out"
          subtitle="Trophies:"
          className="w-full pl-4 border-l-2 border-neutral-600"
          reverse
        />
      );
    }
  }

  return (
    <RankedTagBase
      rank={player.rank}
      imgSrc={`https://cdn.brawlify.com/profile-icons/regular/${player.icon.id}.png`}
      title={player.name}
      subtitle={player.tag}
      extra={extra}
    />
  );
};
