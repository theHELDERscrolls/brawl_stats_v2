interface Props {
  count: number;
}

export const BrawlerSelectorSkeleton = ({ count }: Props) => {
  return Array.from({ length: count ?? 50 }).map((_, i) => (
    <div
      key={i}
      className="transition-all ease-in-out border-2 h-13 w-13 border-neutral-900 bg-neutral-700 animate-pulse"
    ></div>
  ));
};
