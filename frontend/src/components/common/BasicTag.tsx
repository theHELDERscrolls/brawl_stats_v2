type FontStyle = "font-brawlstars font-extralight" | "font-sans font-semibold" | string;
type TitleSize = "text-p" | "text-h5" | string;

type BaseProps = {
  className?: string;
  containerClassName?: string;
  font?: FontStyle;
  iconClassName?: string;
  imageClassName?: string;
  onClick?: () => void;
  size?: number;
  subtitle?: string;
  subtitleClassName?: string;
  title?: string;
  titleClassName?: string;
  titleSize?: TitleSize;
};

type IconProps = BaseProps & {
  iconId: string;
  imgSrc?: never;
};

type ImageProps = BaseProps & {
  iconId?: never;
  imgSrc: string;
};

export type BasicTagProps = IconProps | ImageProps;

export const BasicTag = ({
  className = "",
  containerClassName = "flex items-center justify-start gap-3 py-1 px-2",
  font = "font-sans font-semibold",
  iconClassName = "",
  iconId,
  imageClassName = "bg-cover rounded-full w-13 h-13",
  imgSrc,
  onClick,
  size = 20,
  subtitle,
  subtitleClassName = "text-p text-neutral-400",
  title,
  titleClassName = "",
  titleSize = "text-p",
}: BasicTagProps) => {
  return (
    <div onClick={onClick} className={`${containerClassName} ${className}`}>
      {iconId && (
        <svg width={size} height={size} aria-hidden="true" className={iconClassName}>
          <use xlinkHref={`spriteSheets.svg#${iconId}`}></use>
        </svg>
      )}
      {imgSrc && (
        <img src={imgSrc} alt="user-icon" className={`${imageClassName} ${iconClassName}`} />
      )}
      {title && (
        <div className={`flex flex-col items-start justify-center ${font}`}>
          {title && <p className={`${titleSize} ${titleClassName}`}>{title}</p>}
          {subtitle && <span className={`${subtitleClassName}`}>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
