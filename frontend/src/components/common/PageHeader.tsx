interface Props {
  title: string;
  desc: string;
}

export const PageHeader = ({ title, desc }: Props) => {
  return (
    <header className="flex flex-col items-start justify-center gap-4">
      <h1 className="text-h1 font-brawlstars font-extralight text-amber-400">{title}</h1>
      <p className="font-semibold text-h6">{desc}</p>
    </header>
  );
};
