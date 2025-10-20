import type { UseBrawlerFiltersReturn } from "@/pages/brawlers/hooks";
import { BasicTag } from "../../components/common";

interface Props {
  cycleFilterMode: UseBrawlerFiltersReturn["cycleFilterMode"];
  filterMode: UseBrawlerFiltersReturn["filterMode"];
  searchQuery: UseBrawlerFiltersReturn["searchQuery"];
  setSearchQuery: UseBrawlerFiltersReturn["setSearchQuery"];
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  showFavorites: boolean;
}

export const BrawlerFilterBar = ({
  cycleFilterMode,
  filterMode,
  searchQuery,
  setSearchQuery,
  setShowFavorites,
  showFavorites,
}: Props) => {
  return (
    <div className="sticky z-20 flex flex-col items-center justify-center w-full gap-4 p-2 shadow-md sm:flex-row md:top-1 top-14 rounded-xl bg-neutral-900 shadow-neutral-900">
      <div className="relative w-full">
        <BasicTag
          iconId="icon-search"
          className="absolute -translate-y-1/2 left-1 top-1/2 text-neutral-500"
        />
        <input
          type="text"
          name="Brawler Name"
          id="brawler"
          placeholder="Search brawler..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 pl-10 pr-3 transition rounded-lg outline-none bg-neutral-800 text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-amber-400/60"
        />
      </div>
      <div className="flex items-center justify-center w-full gap-2 sm:justify-end">
        <BasicTag
          iconId="icon-filter"
          title={filterMode}
          containerClassName="cursor-pointer border-2 w-30 border-neutral-900 text-neutral-900 bg-neutral-300 hover:bg-neutral-100 flex items-center justify-center py-1 px-2 gap-2 rounded-xl"
          onClick={() => cycleFilterMode(filterMode)}
        />
        <BasicTag
          iconId="icon-heart"
          title="Favorites"
          containerClassName={`flex items-center justify-center py-1 px-2 gap-2 rounded-xl cursor-pointer border-2 w-30 transition-all ease-in-out hover:bg-neutral-100 ${
            showFavorites
              ? "bg-gradient-to-r from-pink-400/35 to-pink-400/15 text-pink-400 border-pink-400 hover:bg-transparent"
              : "text-neutral-900 bg-neutral-300 border-neutral-900"
          }`}
          onClick={() => setShowFavorites((prev) => !prev)}
        />
      </div>
    </div>
  );
};
