import { BasicInfoRow } from "@/components";
import type { Club } from "@/api/official-api";

interface ClubInfoSectionProps {
  clubInfo: Club;
}

export const ClubInfoSection = ({ clubInfo }: ClubInfoSectionProps) => {
  return (
    <section className="flex flex-col items-center justify-center h-full gap-4 py-2 border-t-2 border-neutral-700">
      <header className="flex flex-col items-center justify-center w-full gap-2 p-4 shadow-md rounded-xl bg-neutral-600/50 shadow-neutral-950">
        <h2 className="w-full text-center text-h5 font-brawlstars font-extralight text-amber-400">
          Description
        </h2>
        <p className="w-full text-center text-p font-brawlstars font-extralight text-balance">
          {clubInfo.description}
        </p>
      </header>
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9waFFBanJmTTd0bldQSEFQUTNTTS5wbmcifQ:supercell:uGkNlUITV98HQEBqST8RoyNlyyAA7-NCuOKpR45pPUU?width=800"
        title="Trophies"
        value={clubInfo.trophies}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC83V1VSY0szVlB0TjF3UlBmMlJicC5wbmcifQ:supercell:Uthv01fb4cXGNaxNU1WVWsP68FHS3cAX8jRztmN-LL0?width=2400"
        title="Required trophies"
        value={clubInfo.requiredTrophies}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9TR3BwaU5DbWhZZUxBZlZkaHZKMy5wbmcifQ:supercell:10WhT_loX9o17Rn9KiiJz3XsTWfnz7ysKLzCM2oIG9w?width=2400"
        title="Members"
        value={clubInfo.members.length}
      />
    </section>
  );
};
