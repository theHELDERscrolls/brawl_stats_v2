import type { GlobalClub } from "@/api";
import { BasicTag, ClubModal, RankedTagBase, useModalContext } from "@/components";

interface ClubTagProps {
  club: GlobalClub;
  showDetails?: boolean;
}

export const ClubTag = ({ club, showDetails = true }: ClubTagProps) => {
  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal(<ClubModal clubTag={club.tag.replace("#", "")} />, {
      withBackdrop: true,
      withCloseButton: true,
      centered: true,
    });
  };

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
      onClick={handleClick}
    />
  );
};
