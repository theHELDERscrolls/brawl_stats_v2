import { BasicTag } from ".";

interface PlayerBasicInfoRowProps {
  imgSrc: string;
  title: string;
  value: React.ReactNode;
}

export const BasicInfoRow = ({ imgSrc, title, value }: PlayerBasicInfoRowProps) => (
  <div className="flex items-center justify-between w-full">
    <BasicTag
      imgSrc={imgSrc}
      title={title}
      titleClassName="text-h5"
      fontClassName="font-brawlstars"
    />
    <p className="font-brawlstars font-extralight text-p sm:text-h6">{value}</p>
  </div>
);
