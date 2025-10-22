import { useEvents } from "@/hooks";
import { BasicTag, Loader } from "../common";
import { useNavigate } from "react-router-dom";

export const ActiveMapsCard = () => {
  const navigate = useNavigate();
  const { loading, events } = useEvents();

  const active = events?.active;

  if (loading)
    return (
      <div className="flex flex-col justify-between max-w-3xl gap-4 p-4 border-2 h-[500px] shadow-md shadow-neutral-950 border-emerald-600 break-inside-avoid rounded-xl bg-gradient-to-br from-emerald-900 to-transparent">
        <Loader loaderColor="emerald"/>
      </div>
    );

  if (!active)
    return (
      <div className="flex items-center justify-center font-brawlstars font-extralight">
        Clubs not found :(
      </div>
    );

  return (
    <div className="flex flex-col justify-between max-w-3xl gap-4 p-4 border-2 shadow-md shadow-neutral-950 border-emerald-600 break-inside-avoid rounded-xl bg-gradient-to-br from-emerald-900 to-transparent">
      <BasicTag
        iconId="icon-map"
        iconClassName="text-emerald-400"
        size={50}
        title="Active maps"
        titleClassName="text-h4 text-emerald-400"
        subtitle="Active maps on rotation."
        subtitleClassName="text-h6 text-neutral-400"
        fontClassName="font-brawlstars font-extralight"
        className="w-full"
      />
      <div className="flex gap-2 p-2 mb-4 overflow-x-auto custom-scrollbar bg-emerald-950 rounded-xl">
        {active.map((m) => (
          <div
            key={m.map.id}
            className="flex relative flex-col items-center justify-center gap-2 p-2 bg-neutral-700/50 rounded-xl min-w-[160px] max-w-[160px]"
          >
            <img src={m.map.imageUrl} alt={`${m.map.name} map`} loading="lazy"/>
            <p className="absolute px-2 text-center border rounded-xl bg-neutral-100 border-neutral-900 text-neutral-900 text-p font-brawlstars font-extralight bottom-2">{m.map.name}</p>
            <img
              src={m.map.gameMode.imageUrl}
              alt={`${m.map.gameMode.name} mode`}
              className="absolute h-10 top-2 right-2"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <span
        className="flex items-center self-center justify-center px-2 py-1 transition-all duration-300 ease-in-out border-2 cursor-pointer w-fit font-brawlstars border-neutral-900 bg-neutral-100 text-neutral-900 rounded-xl hover:bg-neutral-300"
        onClick={() => navigate("/maps")}
      >
        View active maps
      </span>
    </div>
  );
};
