import { BasicTag } from "@/components";
import type { MapDetail } from "@/api/brawlapi";
import type { Events } from "@/api/brawlapi";

interface MapsListProps {
  groupedMaps: Record<string, MapDetail[]>;
  selectedMode: string | null;
  activeEvents?: Events["active"];
  upcomingEvents?: Events["upcoming"];
}

export const MapsList = ({
  groupedMaps,
  selectedMode,
  activeEvents,
  upcomingEvents,
}: MapsListProps) => {
  return (
    <article className="flex flex-wrap items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full gap-4">
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
                subtitle={`Maps in rotation: ${maps.length}`}
                subtitleClassName="z-0 text-h6 text-neutral-300"
                fontClassName="font-brawlstars font-extralight drop-shadow-xs drop-shadow-neutral-950"
                style={{ backgroundColor: gameMode.bgColor }}
                className="w-full rounded-t-lg"
              />

              {/* Maps */}
              <div className="grid grid-cols-2 gap-4 rounded-b-[10px] bg-neutral-700 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {maps.map((m) => {
                  const isActive = activeEvents?.some((e) => e.map.id === m.id);
                  const isUpcoming = upcomingEvents?.some((e) => e.map.id === m.id);

                  return (
                    <div
                      key={m.id}
                      className={`relative flex flex-col items-center justify-around w-full gap-1 p-2 transition-all duration-300 ease-in-out shadow-md cursor-pointer group max-h-50 rounded-xl shadow-neutral-950
                        ${
                          isActive
                            ? "bg-gradient-to-br from-emerald-800 to-emerald-800/10 ring-2 ring-emerald-400"
                            : isUpcoming
                            ? "bg-gradient-to-br from-yellow-800 to-yellow-800/10 ring-2 ring-yellow-400"
                            : "bg-neutral-600"
                        }`}
                    >
                      <img
                        src={m.imageUrl}
                        alt={m.name}
                        className="object-contain w-auto transition-all duration-300 ease-in-out h-28 group-hover:scale-105 group-hover:drop-shadow-md group-hover:drop-shadow-neutral-950"
                      />

                      <p className="px-2 text-center transition-all duration-300 ease-in-out border-2 rounded-xl bg-neutral-100 font-brawlstars text-p text-neutral-900">
                        {m.name}
                      </p>

                      {isActive && (
                        <BasicTag
                          iconId="icon-check"
                          size={24}
                          className="absolute right-2 top-2 flex items-center justify-center animate-pulse text-emerald-400"
                        />
                      )}
                      {isUpcoming && (
                        <BasicTag
                          iconId="icon-clock"
                          size={24}
                          className="absolute right-2 top-2 flex items-center justify-center animate-pulse text-yellow-400"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};
