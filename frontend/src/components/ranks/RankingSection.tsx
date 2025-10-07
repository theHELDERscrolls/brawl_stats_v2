import { useState } from "react";
import { SkeletonBasicTag } from "../common";

interface RankingSectionProps<T> {
  title: string;
  items: T[];
  loading: boolean;
  renderItem: (item: T) => React.ReactNode;
}

export const RankingSection = <T,>({
  title,
  items,
  loading,
  renderItem,
}: RankingSectionProps<T>) => {
  const [limit, setLimit] = useState<number>(10);

  return (
    <section className="relative flex flex-col items-center w-full h-[500px] gap-4 p-2 shadow-xl rounded-xl bg-neutral-900/50 shadow-neutral-900">
      <h3 className="w-full text-center border-b-2 border-neutral-700/50 text-h3 text-amber-400 font-brawlstars font-extralight">
        {title}
      </h3>
      <div className="relative w-32">
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="w-full px-2 py-1 border-2 outline-none appearance-none sm:px-3 sm:py-2 text-p text-neutral-900 bg-neutral-100 border-neutral-900 rounded-xl font-brawlstars font-extralight"
        >
          <option value={10}>Top 10</option>
          <option value={50}>Top 50</option>
          <option value={100}>Top 100</option>
          <option value={200}>Top 200</option>
        </select>

        <span className="absolute inset-y-0 flex items-center pointer-events-none right-2 text-neutral-900">
          ▼
        </span>
      </div>

      <div className="w-full overflow-y-auto p-2 custom-scrollbar">
        <div className="flex flex-col items-center justify-start w-full gap-4">
          {loading ? <SkeletonBasicTag count={10} /> : items.slice(0, limit).map(renderItem)}
        </div>
      </div>
    </section>
  );
};
