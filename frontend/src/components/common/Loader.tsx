import { BrawlStatsLogo } from "./BrawlStatsLogo";

interface LoaderProps {
  message?: string;
  loaderColor?: "cyan" | "amber" | "emerald" | "red";
}

export const Loader = ({ message = "Loading...", loaderColor }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl gap-4 p-4 font-brawlstars font-extralight text-neutral-100 rounded-xl">
      <BrawlStatsLogo
        size={150}
        strokeWidth={10}
        className={`animate-pulse ${
          loaderColor === "cyan"
            ? "text-cyan-400"
            : loaderColor === "amber"
            ? "text-amber-400"
            : loaderColor === "emerald"
            ? "text-emerald-400"
            : loaderColor === "red"
            ? "text-red-400"
            : "text-neutral-400"
        }`}
      />
      <p className="text-h4">{message}</p>
    </div>
  );
};
