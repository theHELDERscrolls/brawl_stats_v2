import { BrawlStatsLogo } from "./BrawlStatsLogo";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl gap-4 p-4 font-brawlstars font-extralight text-neutral-100 rounded-xl">
      <BrawlStatsLogo size={150} strokeWidth={10} className="text-cyan-400 animate-pulse" />
      <p className="text-h4">Loading...</p>
    </div>
  );
};
