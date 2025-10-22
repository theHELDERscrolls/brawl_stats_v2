interface Props {
  count: number;
}

export const SkeletonBasicTag = ({ count }: Props) => {
  return Array.from({ length: count || 50 }).map((_, i) => (
    <div
      key={i}
      className="flex items-center justify-start w-full h-16 gap-4 px-4 min-h-13 text-p rounded-xl bg-neutral-700/50 animate-pulse"
    ></div>
  ));
};
