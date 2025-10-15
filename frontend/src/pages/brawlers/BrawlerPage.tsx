import { BasicTag, PageHeader } from "@/components";
import {
  BrawlerCard,
  BrawlerFilterBar,
  BrawlerSection,
  BrawlerSkeletonGrid,
} from "@/components/brawlers";
import { useBrawlerFilters, useBrawlers, useFavorites } from "./hooks";
import { useEffect, useState } from "react";

export const BrawlersPage = () => {
  const { loading, brawlers } = useBrawlers();
  const { favorites, toggleFavorite } = useFavorites();

  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const {
    filterMode,
    cycleFilterMode,
    searchQuery,
    setSearchQuery,
    filteredBrawlers,
    brawlersByGroup,
  } = useBrawlerFilters(brawlers, favorites, showFavorites);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full gap-8">
      <PageHeader title="Brawler list" desc="Click in a brawler to check his player's rank." />

      <BrawlerFilterBar
        cycleFilterMode={cycleFilterMode}
        filterMode={filterMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />

      <main className="flex flex-col gap-10">
        {/* Filter by name */}
        {loading ? (
          <BrawlerSkeletonGrid count={brawlers.length} />
        ) : (
          filteredBrawlers.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-brawlstars text-h2 text-neutral-100">A - Z</h2>
              <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                {filteredBrawlers.map((b) => {
                  const isFav = favorites.includes(b.id);

                  return (
                    <BrawlerCard
                      key={b.id}
                      brawler={b}
                      isFav={isFav}
                      toggleFavorite={toggleFavorite}
                    />
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* Filter by group */}
        {brawlersByGroup.length > 0 &&
          brawlersByGroup.map((group) => (
            <BrawlerSection
              key={group.groupName}
              title={group.groupName}
              brawlers={group.brawlers}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}

        {/* Empty state from favs */}
        {showFavorites && filteredBrawlers.length === 0 && brawlersByGroup.length === 0 && (
          <BasicTag
            iconId="icon-heart"
            title="Choose your favorites brawlers!"
            className="self-center text-neutral-300 "
            iconClassName="text-pink-300 animate-pulse"
          />
        )}
      </main>
    </div>
  );
};
