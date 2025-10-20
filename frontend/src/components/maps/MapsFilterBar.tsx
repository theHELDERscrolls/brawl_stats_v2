import { BasicTag } from "@/components";
import { useMediaQuery } from "@/hooks";
import type { Dispatch, SetStateAction } from "react";
import type { MapDetail } from "@/api/brawl-stars-api/types";

interface MapFilterBarProps {
  groupedMaps: Record<string, MapDetail[]>;
  selectedMode: string | null;
  setSelectedMode: (mode: string | null) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MapsFilterBar = ({
  groupedMaps,
  selectedMode,
  setSelectedMode,
  isOpen,
  setIsOpen,
}: MapFilterBarProps) => {
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <div className="sticky z-30 flex flex-col items-center justify-center pt-4 top-15 rounded-xl bg-neutral-900/90 md:top-3">
      <span
        className="px-2 transition-all duration-300 ease-in-out border-2 cursor-pointer rounded-xl border-neutral-900 bg-neutral-100 font-brawlstars font-extralight text-neutral-900 hover:bg-neutral-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ▼ Select game mode
      </span>

      <div
        className={`flex flex-wrap items-center justify-center gap-2 overflow-hidden rounded-xl py-2 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "pointer-events-none max-h-0 opacity-0"
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
          className={`rounded-xl bg-neutral-800 text-shadow-xs text-shadow-neutral-950 ring-2 transition-all duration-300 ease-in-out hover:bg-neutral-700 cursor-pointer ${
            selectedMode === null ? "ring-cyan-400" : "ring-neutral-500"
          }`}
          containerClassName="flex h-15 w-15 flex-col items-center justify-center gap-1 p-4 p-1 md:h-20 md:w-20"
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
              className={`rounded-xl bg-neutral-800 text-shadow-xs text-shadow-neutral-950 ring-2 transition-all duration-300 ease-in-out hover:bg-neutral-700 cursor-pointer ${
                selectedMode === gameModeName ? "ring-cyan-400" : "ring-neutral-500"
              }`}
              containerClassName="flex h-15 w-15 flex-col items-center justify-center gap-1 p-4 p-1 md:h-20 md:w-20"
              onClick={() => {
                setSelectedMode(gameModeName);
                setIsOpen(false);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
