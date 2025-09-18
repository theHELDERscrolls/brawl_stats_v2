import { BrawlerCard } from "@/components/brawlers";
import type { BrawlerDetail } from "@/api";

interface BrawlerSectionProps {
  title: string;
  brawlers: BrawlerDetail[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const BrawlerSection = ({
  title,
  brawlers,
  favorites,
  toggleFavorite,
}: BrawlerSectionProps) => {
  if (brawlers.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-brawlstars text-h2 text-neutral-100">{title}</h2>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
        {brawlers.map((b) => (
          <BrawlerCard
            key={b.id}
            brawler={b}
            isFav={favorites.includes(b.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
};
