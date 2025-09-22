import { BasicTag, RankedTagBase } from "@/components";

interface Club {
  tag: string;
  rank: number;
  name: string;
  badgeId: number;
  trophies: number;
}

interface ClubTagProps {
  club: Club;
  showDetails?: boolean; // controla si se muestra el bloque extra
}

export const ClubTag = ({ club, showDetails = true }: ClubTagProps) => {
  return (
    <RankedTagBase
      rank={club.rank}
      imgSrc={`https://cdn.brawlify.com/club-badges/regular/${club.badgeId}.png`}
      title={club.name}
      subtitle={club.tag}
      extra={
        showDetails ? (
          <BasicTag
            iconId="icon-trophy"
            iconClassName="text-amber-500/50 group-hover:text-amber-500 transition-all ease-in-out"
            title={club.trophies.toString()}
            titleClassName="font-brawlstars font-extralight text-amber-500/50 group-hover:text-amber-500 transition-all ease-in-out"
            subtitle="Trophies:"
            className="w-full pl-4 border-l-2 border-neutral-600"
            reverse
          />
        ) : (
          ""
        )
      }
    />
  );
};
