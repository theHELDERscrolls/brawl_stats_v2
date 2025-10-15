import { BasicTag } from "@/components";

export const MapTagsLegend = () => (
  <div className="flex flex-wrap gap-4">
    <BasicTag
      iconId="icon-check"
      size={32}
      title="Active map"
      subtitle="Map currently active in the ongoing rotation event"
      className="flex items-center justify-center gap-2 w-fit border-emerald-400 text-emerald-400"
    />
    <BasicTag
      iconId="icon-clock"
      size={32}
      title="Upcoming map"
      subtitle="Map that will appear in the next rotation event"
      className="flex items-center justify-center gap-2 text-yellow-400 border-yellow-400 w-fit"
    />
  </div>
);
