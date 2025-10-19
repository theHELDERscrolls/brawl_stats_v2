import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clubTagSchema, type ClubTag } from "@/pages";
import { BasicTag } from "../common";

interface SearchClubFormProps {
  onSubmit: (tag: string) => void;
}

export const SearchClubTagForm = ({ onSubmit }: SearchClubFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClubTag>({
    resolver: zodResolver(clubTagSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const submit = (data: ClubTag) => onSubmit(data.clubTag);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col max-w-3xl gap-4 p-4 border-2 shadow-md shadow-neutral-950 border-amber-600 rounded-xl font-brawlstars bg-neutral-900/50 font-extralight"
    >
      <label>
        <BasicTag
          iconId="icon-club"
          iconClassName="text-amber-400"
          size={24}
          title="Search club tag"
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
          {...register("clubTag")}
          placeholder="Club tag"
          autoComplete="off"
          className="w-full p-2 transition-all duration-300 ease-in-out border-2 text-p bg-neutral-800 border-neutral-500 rounded-r-xl focus:outline-none focus:bg-neutral-700/75 focus:border-amber-400"
        />
      </div>
      {errors.clubTag ? (
        <p className="text-red-400 text-p">{errors.clubTag.message}</p>
      ) : (
        <div className="h-6"></div>
      )}
    </form>
  );
};
