import { BrawlerSkeleton } from "./BrawlerSkeleton";

interface Props {
  count: number;
}

export const BrawlerSkeletonGrid = ({ count }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-brawlstars text-h2 text-neutral-100">A - Z</h2>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
        {Array.from({ length: count || 50 }).map((_, i) => (
          <BrawlerSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
