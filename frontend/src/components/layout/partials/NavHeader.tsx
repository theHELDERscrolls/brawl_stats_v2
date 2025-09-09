import { BrawlStatsLogo } from "@/components/common";

type TextSizes = "text-h1" | "text-h2" | "text-h3" | "text-h4" | "text-h5" | "text-h6" | "text-p";

interface Props {
  size?: number;
  strokeWidth?: number;
  textSize: TextSizes;
}

export const NavHeader = ({ size = 32, strokeWidth = 15, textSize }: Props) => {
  return (
    <div className="flex items-center justify-start gap-2 cursor-default text-neutral-100">
      <BrawlStatsLogo size={size} strokeWidth={strokeWidth} className="text-cyan-400" />
      <h2 className={`font-brawlstars ${textSize}`}>Brawl Stats</h2>
    </div>
  );
};
