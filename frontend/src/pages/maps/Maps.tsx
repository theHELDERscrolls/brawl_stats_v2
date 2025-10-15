import { groupMapsByGameMode, preloadImages } from "@/utils";
import { MapsFilterBar, MapSkeleton, MapsList, MapTagsLegend, PageHeader } from "@/components";
import { useEffect, useState } from "react";
import { useEvents, useMaps } from "./hooks";

export const Maps = () => {
  const { loading: loadingMaps, maps } = useMaps();
  const { events } = useEvents();

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeEvents = events?.active;
  const upcomingEvetns = events?.upcoming;

  const abledMaps = maps?.list?.filter((m) => !m.disabled) ?? [];
  const groupedMaps = groupMapsByGameMode(abledMaps);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!maps?.list?.length) return;

    const loadImages = async () => {
      const urls = maps.list.map((m) => m.imageUrl);
      await preloadImages(urls);
      setImagesLoaded(true);
    };

    loadImages();
  }, [maps]);

  return (
    <section className="relative flex flex-col w-full h-full gap-4">
      <PageHeader
        title="Maps"
        desc="Check out all maps currently in rotation and see which ones are active or upcoming. Click a map to view its latest data for the best and all Brawlers."
      />
      <MapTagsLegend />

      {/* Filter */}
      {loadingMaps && !imagesLoaded ? (
        <MapSkeleton />
      ) : (
        <>
          <MapsFilterBar
            groupedMaps={groupedMaps}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          <MapsList
            groupedMaps={groupedMaps}
            selectedMode={selectedMode}
            activeEvents={activeEvents}
            upcomingEvents={upcomingEvetns}
          />
        </>
      )}
    </section>
  );
};
