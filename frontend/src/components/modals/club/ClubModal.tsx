import { BasicTag, ClubInfoSection, Loader, PlayerTag } from "@/components";
import { useClubInfo, useMediaQuery } from "@/hooks";

interface ClubModalProps {
  clubTag: string;
}

export const ClubModal = ({ clubTag }: ClubModalProps) => {
  const hasDetails = useMediaQuery("(min-width: 640px)");

  const { clubInfo, loading: loadingClubInfo } = useClubInfo(clubTag);

  if (loadingClubInfo)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl text-h4 font-brawlstars font-extralight text-neutral-100 bg-neutral-800 rounded-xl">
        <Loader />
      </div>
    );
  if (!clubInfo)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl gap-4 p-4 sm:p-4 text-neutral-100 bg-neutral-800 rounded-xl">
        Data not found.
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full max-w-3xl gap-4 p-4 overflow-y-auto sm:p-4 text-neutral-100 bg-neutral-800 rounded-xl custom-scrollbar">
      <BasicTag
        imgSrc={`https://cdn.brawlify.com/club-badges/regular/${clubInfo.badgeId.toString()}.png`}
        title={clubInfo.name}
        subtitle={clubInfo.tag}
        imageClassName="h-20 sm:h-30"
        titleClassName="text-h3 text-neutral-100 drop-shadow-xs drop-shadow-neutral-950 font-bold"
        subtitleClassName="text-h4 text-cyan-400 drop-shadow-xs drop-shadow-neutral-950"
      />

      <ClubInfoSection clubInfo={clubInfo} />

      <section className="flex flex-col items-center justify-start gap-2 py-2 border-t-2 h-fit border-neutral-700">
        <h2 className="text-h3 font-brawlstars font-extralight text-amber-400">Members</h2>
        {clubInfo.members.map((m) => (
          <PlayerTag key={m.tag} player={m} variant="withTrophies" showDetails={hasDetails} />
        ))}
      </section>
    </div>
  );
};
