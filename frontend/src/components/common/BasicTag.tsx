type BasicTagProps = {
  className?: string;
  containerClassName?: string;
  iconId?: string;
  imgSrc?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  reverse?: boolean;
  size?: number;
  title?: string;
  subtitle?: string;
  fontClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  imageClassName?: string;
  iconClassName?: string;
};

export const BasicTag = ({
  className = "",
  containerClassName = "flex items-center justify-start gap-3 py-1 px-2",
  iconId,
  imgSrc,
  onClick,
  reverse = false,
  size = 20,
  title,
  subtitle,
  fontClassName = "font-sans font-semibold",
  titleClassName = "text-xs sm:text-p",
  subtitleClassName = "text-p text-neutral-400",
  imageClassName = "bg-cover rounded w-10",
  iconClassName = "",
}: BasicTagProps) => {
  return (
    <div onClick={onClick} className={`${containerClassName} ${className}`}>
      {iconId && (
        <svg width={size} height={size} aria-hidden="true" className={iconClassName}>
          <use xlinkHref={`spriteSheets.svg#${iconId}`} />
        </svg>
      )}

      {imgSrc && <img src={imgSrc} alt="user-icon" className={imageClassName} />}

      {(title || subtitle) && (
        <div
          className={`flex items-start justify-center ${
            reverse ? "flex-col-reverse" : "flex-col"
          } ${fontClassName}`}
        >
          {title && <p className={titleClassName}>{title}</p>}
          {subtitle && <span className={subtitleClassName}>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
