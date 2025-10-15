import { BasicTag, MapBrawlerCard } from "@/components";

interface MapBrawlerSectionProps {
  title: string;
  subtitle: string;
  titleClassName: string;
  imgSrc: string;
  data: { brawler: number; winRate: number; useRate: number }[];
  getBrawler: (id: number) => { id: number; name: string; imageUrl: string } | undefined;
}

export const MapBrawlerSection = ({
  title,
  subtitle,
  titleClassName,
  imgSrc,
  data,
  getBrawler,
}: MapBrawlerSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <BasicTag
        imgSrc={imgSrc}
        title={title}
        titleClassName={titleClassName}
        subtitle={subtitle}
        fontClassName="font-brawlstars font-extralight"
      />

      <div className="flex overflow-x-scroll gap-2">
        {data.map((item) => {
          const brawler = getBrawler(item.brawler);
          return (
            <MapBrawlerCard
              key={item.brawler}
              brawler={brawler}
              winRate={item.winRate}
              useRate={item.useRate}
            />
          );
        })}
      </div>
    </div>
  );
};
