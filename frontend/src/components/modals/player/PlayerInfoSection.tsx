import type { PlayerInfo } from "@/api/brawlstars";
import { BasicInfoRow } from "@/components";

interface PlayerInfoSectionProps {
  playerInfo: PlayerInfo;
  totalBrawlers: number;
}

export const PlayerInfoSection = ({ playerInfo, totalBrawlers }: PlayerInfoSectionProps) => {
  return (
    <section className="flex flex-col items-center justify-around h-full gap-2 py-2 border-t-2 border-neutral-700">
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9waFFBanJmTTd0bldQSEFQUTNTTS5wbmcifQ:supercell:uGkNlUITV98HQEBqST8RoyNlyyAA7-NCuOKpR45pPUU?width=800"
        title="Trophies"
        value={playerInfo.trophies}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC83NWQxejNlMzZ6QXNzbU1URVdCdy5wbmcifQ:supercell:POAaehHzOOrs5AbN4nGFPWrrvJLAs6CKFNCcVEdjWqc?width=2400"
        title="Highest Trophies"
        value={playerInfo.highestTrophies}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9xcGNqOVdrSzlidlZRR1p2VzlmWS5wbmcifQ:supercell:1t_0zjd7hU3YHfzVTP3icr6elnaeVy221hrk5NY8jyk?width=800"
        title="Level"
        value={playerInfo.expLevel}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9TR3BwaU5DbWhZZUxBZlZkaHZKMy5wbmcifQ:supercell:10WhT_loX9o17Rn9KiiJz3XsTWfnz7ysKLzCM2oIG9w?width=2400"
        title="Club"
        value={playerInfo.club?.name}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9kRzJKelBoemZ0eTc2MWdlUWdoai5wbmcifQ:supercell:HGEne2w9w_e-ZDXb_9xMTEZOdf__H4RJN5Gu1isUDHU?width=800"
        title="Unlock Brawlers"
        value={`${playerInfo.brawlers.length}/${totalBrawlers}`}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC96cXIxUDVLUWRXbXVUMWJmYTF1Ri5wbmcifQ:supercell:GNkQm-4jjPnHmsKfWTNCdzVGlVdl2E4rENNNkT_67OU?width=800"
        title="3 vs 3 victories"
        value={playerInfo["3vs3Victories"]}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9reDI3Z1ZFMnNtNVdoV2ZrSkF5OC5wbmcifQ:supercell:GWIPYs5kZQZCzPm31ppVTsT442GADBiO2OVNmKKLWJ8?width=800"
        title="Solo Victories"
        value={playerInfo.soloVictories}
      />
      <BasicInfoRow
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC92ZTVWMWZ0VUJMcURXN1E1OWZ1Wi5wbmcifQ:supercell:6id_IIK7p_QRUPlqet4C_LImEdZpGwi8PfRziAehXt0?width=800"
        title="Duo Victories"
        value={playerInfo.duoVictories}
      />
    </section>
  );
};
