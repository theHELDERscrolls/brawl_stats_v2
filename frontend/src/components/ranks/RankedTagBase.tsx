import { type ReactNode } from "react";
import { BasicTag } from "@/components";

interface RankedTagBaseProps {
  rank: number | undefined;
  imgSrc: string;
  title: string;
  subtitle: string;
  extra?: ReactNode;
  onClick?: () => void;
}

export const RankedTagBase = ({
  rank,
  imgSrc,
  title,
  subtitle,
  extra,
  onClick,
}: RankedTagBaseProps) => {
  return (
    <div
      className="flex items-center justify-start w-full gap-4 px-4 transition-all ease-in-out shadow-md cursor-pointer shadow-neutral-950 min-h-16 rounded-xl bg-neutral-700/50 hover:bg-neutral-700 hover:ring-2 hover:ring-amber-400 group hover:-translate-y-1"
      onClick={onClick}
    >
      {rank && (
        <span
          className={`w-8 sm:w-17 text-h6 font-brawlstars ${
            rank === 1
              ? "text-yellow-500"
              : rank === 2
              ? "text-slate-500"
              : rank === 3
              ? "text-amber-800"
              : "text-neutral-100"
          }`}
        >
          {rank}
        </span>
      )}

      <BasicTag
        className="w-full"
        imgSrc={imgSrc}
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-cyan-400/50 group-hover:text-cyan-400 transition-all ease-in-out"
      />

      {extra}
    </div>
  );
};
