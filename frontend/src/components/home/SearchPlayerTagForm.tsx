import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { playerTagSchema, type PlayerTag } from "@/pages";
import { BasicTag } from "../common";

interface SearchPlayerFormProps {
  onSubmit: (tag: string) => void;
}

export const SearchPlayerTagForm = ({ onSubmit }: SearchPlayerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerTag>({
    resolver: zodResolver(playerTagSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const submit = (data: PlayerTag) => onSubmit(data.playerTag);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col max-w-3xl gap-4 p-4 border-2 shadow-md shadow-neutral-950 border-cyan-600 rounded-xl font-brawlstars bg-neutral-900/50 font-extralight"
    >
      <label>
        <BasicTag
          iconId="icon-user"
          iconClassName="text-cyan-400"
          size={24}
          title="Search player tag"
          titleClassName="text-h5"
          fontClassName="font-brawlstars font-extralight"
        />
      </label>
      <div className="flex items-center justify-center">
        <span className="flex items-center justify-center h-full p-2 border-2 border-r-0 text-p bg-neutral-700 text-neutral-500 rounded-l-xl">
          #
        </span>
        <input
          type="text"
          {...register("playerTag")}
          placeholder="Player tag"
          autoComplete="off"
          className="w-full p-2 transition-all duration-300 ease-in-out border-2 text-p bg-neutral-800 border-neutral-500 rounded-r-xl focus:outline-none focus:bg-neutral-700/75 focus:border-cyan-400"
        />
      </div>
      {errors.playerTag ? (
        <p className="text-red-400 text-p">{errors.playerTag.message}</p>
      ) : (
        <div className="h-6"></div>
      )}
    </form>
  );
};
