import { BasicTag, Loader } from "@/components/common";
import { useBrawlers } from "@/pages";
import { useMapStats } from "@/pages/maps";
import { MapBrawlerSection } from "./MapBrawlerSection";

interface MapModalProps {
  mapId: number;
}

export const MapModal = ({ mapId }: MapModalProps) => {
  const { loading: loadingMap, mapStats } = useMapStats(mapId);
  const { brawlers, loading: loadingBrawlers } = useBrawlers();

  if (loadingMap || loadingBrawlers)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl text-h4 font-brawlstars font-extralight text-neutral-100 bg-neutral-800 rounded-xl">
        <Loader />
      </div>
    );
  if (!mapStats) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl gap-4 p-4 text-neutral-100 bg-neutral-800 rounded-xl">
        Data not found.
      </div>
    );
  }

  const stats = mapStats.stats ?? [];

  const maxWin = Math.max(...stats.map((s) => s.winRate));
  const maxUse = Math.max(...stats.map((s) => s.useRate));

  const bestRanked = stats
    .map((s) => ({
      ...s,
      score: (s.winRate / maxWin) * 0.5 + (s.useRate / maxUse) * 0.5,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const worstRanked = stats
    .map((s) => ({
      ...s,
      score: (s.winRate / maxWin) * 0.5 + (s.useRate / maxUse) * 0.5,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  const bestWinRate = [...stats].sort((a, b) => b.winRate - a.winRate).slice(0, 10);
  const mostUseRate = [...stats].sort((a, b) => b.useRate - a.useRate).slice(0, 10);

  const getBrawler = (id: number) => brawlers.find((b) => b.id === id);

  return mapStats.id === mapId ? (
    <div className="flex-col w-full h-full max-w-3xl gap-4 p-4 overflow-y-auto flex text-neutral-100 bg-neutral-800 rounded-xl custom-scrollbar">
      <div className="flex flex-col items-center justify-center gap-4">
        <BasicTag
          imgSrc={mapStats.gameMode.imageUrl}
          title={mapStats.name}
          titleClassName="text-h4 drop-shadow-xs drop-shadow-neutral-950"
          subtitle={mapStats.gameMode.name}
          subtitleClassName="text-h6 text-neutral-400 drop-shadow-xs drop-shadow-neutral-950"
          fontClassName="font-brawlstars font-extralight"
          className="rounded-[10px] w-full"
          style={{ backgroundColor: mapStats.gameMode.bgColor }}
        />
        <img
          src={mapStats.imageUrl}
          alt={`${mapStats.name} map`}
          className="w-50 drop-shadow-lg drop-shadow-neutral-950"
        />
      </div>

      <MapBrawlerSection
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9wcjFDdm5aTTRQS3dtUmtKVkRUUi5wbmcifQ:supercell:0GeZ96BpVtULTS3Y9IqCpCbvcughkEaPZb_AqZjT92s?width=2400"
        title="Best Picks"
        titleClassName="text-h4 text-amber-400"
        subtitle="Top 10 in both win and use rates—reliable and popular choices."
        data={bestRanked}
        getBrawler={getBrawler}
      />

      <MapBrawlerSection
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC8zZXd0TE5CbXpFOGNQZDh0cWR5Yi5wbmcifQ:supercell:unOAfLy4ysGfexi4hOTKtRf_4P9yAAoANGg-tjbLwVQ?width=2400"
        title="Winners"
        titleClassName="text-h4 text-pink-400"
        subtitle="Highest win rate on this map."
        data={bestWinRate}
        getBrawler={getBrawler}
      />

      <MapBrawlerSection
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9SU2t5WHEyZXdOQUZvRDFVemNESy5wbmcifQ:supercell:C-SfFFccfAI0wFVtLS0zocoHpCQzKRceP5A3-XKXcsE?width=2400"
        title="Most Used"
        titleClassName="text-h4 text-green-500"
        subtitle="Most popular by use rate."
        data={mostUseRate}
        getBrawler={getBrawler}
      />

      <MapBrawlerSection
        imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC80QW9mbWpwWWc5c1ViV1hCVWlxbS5wbmcifQ:supercell:XyTAT1cHAMoco0Pel-Aha0WKSMaqae9XJS4bolYTn90?width=2400"
        title="Not Recommended"
        titleClassName="text-h4 text-red-400"
        subtitle="Outside top 10 in win or use rates—may underperform."
        data={worstRanked}
        getBrawler={getBrawler}
      />
    </div>
  ) : null;
};
