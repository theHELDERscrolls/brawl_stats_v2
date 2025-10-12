export const MapSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-8 animate-pulse">
      {/* Filter */}
      <div className="flex flex-wrap justify-center w-full gap-2 p-2 h-15 bg-neutral-600 rounded-xl animate-pulse"></div>

      <div className="flex flex-col items-center justify-center w-full gap-4 p-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className="w-full border-2 border-neutral-800 rounded-xl bg-neutral-800/40">
            {/* Header */}
            <div className="w-full rounded-t-lg h-21 bg-neutral-700" />

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 rounded-b-[10px] bg-neutral-700">
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="w-full h-40 bg-neutral-600 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
