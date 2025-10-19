import { BasicTag } from "../common";
import { rarityBackgroundStyle } from "@/utils";
import { useNavigate } from "react-router-dom";
import type { BrawlerDetail } from "@/api";

interface Props {
  brawler: BrawlerDetail;
  isFav?: boolean;
  toggleFavorite?: (id: number) => void;
}

export const BrawlerCard = ({ brawler, isFav, toggleFavorite }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ranks?brawler=${brawler.id}`)}
      className={`relative w-34 lg:w-60 xl:w-2xs cursor-pointer overflow-hidden rounded-xl border-3 transition-all ease-in-out group border-neutral-900 lg:border-neutral-100 lg:hover:border-neutral-900 ${rarityBackgroundStyle(
        brawler
      )}`}
    >
      <img
        src={`https://raw.githubusercontent.com/Brawlify/CDN/master/brawlers/portraits/${brawler.id}.png`}
        alt={`${brawler.name} portrait`}
        className="h-20 transition-all ease-in-out lg:h-25 drop-shadow-md drop-shadow-neutral-900 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-105"
      />
      <p className="absolute bottom-0.5 right-1 lg:bottom-2 lg:right-2 px-1 py-0.5 lg:px-2 lg:py-1 border-2 rounded-xl bg-neutral-100 text-neutral-900 font-brawlstars font-extralight text-p lg:text-h6 shadow-xs shadow-neutral-900 transition-all ease-in-out lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
        {brawler.name}
      </p>
      {isFav && (
        <BasicTag
          iconId="icon-heart"
          size={25}
          className="absolute top-0 right-0 z-10 transition-all ease-in-out lg:-translate-y-full lg:opacity-0 lg:hover:scale-110 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
          iconClassName={`${isFav ? "text-pink-700" : "text-neutral-900"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite?.(brawler.id);
          }}
        />
      )}
    </div>
  );
};
