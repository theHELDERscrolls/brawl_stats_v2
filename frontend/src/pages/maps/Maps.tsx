import { BasicTag, MapSkeleton, PageHeader } from "@/components";
import { groupMapsByGameMode } from "@/utils";
import { preloadImages } from "@/utils/preloadImages";
import { useEffect, useState } from "react";
import { useMaps } from "./hooks";
import { useMediaQuery } from "@/hooks";

export const Maps = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");

  const { loading, maps } = useMaps();
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!maps?.list?.length) return;

    const loadImages = async () => {
      const urls = maps.list.map((m) => m.imageUrl);
      await preloadImages(urls);
      setImagesLoaded(true);
    };

    loadImages();
  }, [maps]);

  const abled = maps?.list?.filter((m) => !m.disabled) ?? [];
  const groupedMaps = groupMapsByGameMode(abled);

  return (
    <section className="relative flex flex-col w-full h-full gap-4">
      <PageHeader
        title="Maps"
        desc="Checkout all active maps on rotatio. Click on a map to check its last data for best and all brawlers."
      />

      {/* Filter */}
      {loading && !imagesLoaded ? (
        <MapSkeleton />
      ) : (
        <>
          {/* filter icons */}
          <div className="sticky z-30 flex flex-col items-center justify-center pt-4 top-15 md:top-5 bg-neutral-900/90 rounded-xl">
            <span
              className="px-2 transition-all duration-300 ease-in-out border-2 cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-900 font-brawlstars font-extralight rounded-xl"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              ▼ Select game mode
            </span>

            <div
              className={`flex flex-wrap py-2 rounded-xl items-center justify-center gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "opacity-100 max-h-screen" : "opacity-0 pointer-events-none max-h-0"
              }`}
            >
              <BasicTag
                imgSrc={
                  !isTablet
                    ? ""
                    : "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9hOTZvbVFlc0Z6azVGS2lScUh3Sy5wbmcifQ:supercell:ri5oIJNYhnSje2Q6EkYVDPA8dDX4lP4v48FKR4Go_M4?width=2400"
                }
                imageClassName="h-8"
                title="All"
                titleClassName="text-center text-h5 md:text-xs"
                fontClassName="font-brawlstars font-extralight"
                className={`transition-all duration-300 ease-in-out ring-2 cursor-pointer text-shadow-xs text-shadow-neutral-950 rounded-xl bg-neutral-800 hover:bg-neutral-700 ${
                  selectedMode === null ? "ring-cyan-400" : "ring-neutral-500"
                }`}
                containerClassName="flex flex-col items-center justify-center p-4 w-15 md:w-20 h-15 md:h-20 gap-1 p-1"
                onClick={() => {
                  setSelectedMode(null);
                  setIsOpen(false);
                }}
              />
              {Object.entries(groupedMaps).map(([gameModeName, maps]) => {
                const gameMode = maps[0].gameMode;
                return (
                  <BasicTag
                    key={gameModeName}
                    imgSrc={gameMode.imageUrl}
                    imageClassName="max-h-8"
                    title={isTablet ? gameMode.name : undefined}
                    titleClassName="text-center text-xs"
                    fontClassName="font-brawlstars font-extralight"
                    className={`transition-all duration-300 ease-in-out ring-2 cursor-pointer text-shadow-xs text-shadow-neutral-950 rounded-xl bg-neutral-800 hover:bg-neutral-700 ${
                      selectedMode === gameModeName ? "ring-cyan-400" : "ring-neutral-500"
                    }`}
                    containerClassName="flex flex-col items-center justify-center p-4 w-15 md:w-20 h-15 md:h-20 gap-1 p-1"
                    onClick={() => {
                      setSelectedMode(gameModeName);
                      setIsOpen(false);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <article className="flex flex-wrap items-center justify-center gap-6 p-2">
            <div className="flex flex-col items-center justify-center w-full gap-4 p-4">
              {Object.entries(groupedMaps).map(([gameModeName, maps]) => {
                if (selectedMode && selectedMode !== gameModeName) return null;

                const gameMode = maps[0].gameMode;

                return (
                  <div
                    key={gameModeName}
                    className="w-full border-2 shadow-md rounded-xl shadow-neutral-950"
                    style={{ borderColor: gameMode.bgColor }}
                  >
                    {/* Header */}
                    <BasicTag
                      imgSrc={gameMode.imageUrl}
                      imageClassName="h-15"
                      title={gameMode.name}
                      titleClassName="text-h4"
                      subtitle={`Maps on rotation: ${maps.length}`}
                      subtitleClassName="text-h6 text-neutral-300 z-0"
                      fontClassName="font-brawlstars font-extralight drop-shadow-xs drop-shadow-neutral-950"
                      style={{ backgroundColor: gameMode.bgColor }}
                      className="w-full rounded-t-lg"
                    />

                    {/* Maps */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 rounded-b-[10px] bg-neutral-700">
                      {maps.map((m) => (
                        <div
                          key={m.id}
                          className="flex flex-col items-center justify-around w-full gap-1 p-2 transition-all duration-300 ease-in-out shadow-md cursor-pointer group bg-neutral-600 rounded-xl shadow-neutral-950 hover:ring-3 hover:ring-amber-400 max-h-50"
                        >
                          <img
                            src={m.imageUrl}
                            alt={m.name}
                            className="object-contain w-auto transition-all duration-300 ease-in-out h-28 group-hover:drop-shadow-md group-hover:drop-shadow-neutral-950 group-hover:scale-105"
                          />
                          <p className="px-2 text-sm text-center transition-all duration-300 ease-in-out border-2 font-brawlstars group-hover:drop-shadow-md group-hover:drop-shadow-neutral-950 bg-neutral-100 text-neutral-900 rounded-xl group-hover:scale-105">
                            {m.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </>
      )}
    </section>
  );
};
