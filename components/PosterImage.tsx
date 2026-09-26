"use client";

import type { FC } from "react";
import { type ComponentProps, useState } from "react";
import Image from "next/image";

interface PosterImageProps extends Omit<ComponentProps<typeof Image>, "src" | "width" | "height"> {
  src?: string;
  width?: number | string;
  height?: number | string;
  fallbackSrc?: string;
  wrapperClassName?: string;
}

const PosterImage: FC<PosterImageProps> = ({
  src,
  alt,
  width = 342,
  height = 513,
  fallbackSrc = "/no-image.jpg",
  wrapperClassName,
  onError,
  ...props
}) => {
  const [failedSource, setFailedSource] = useState<string>();
  const normalized = src?.startsWith("./") ? src.slice(1) : src;
  const fallback = fallbackSrc.startsWith("./") ? fallbackSrc.slice(1) : fallbackSrc;
  const image = (
    <Image
      {...props}
      src={!normalized || failedSource === normalized ? fallback : normalized}
      alt={alt}
      width={Number(width)}
      height={Number(height)}
      unoptimized
      onError={(event) => {
        setFailedSource(normalized);
        onError?.(event);
      }}
    />
  );

  return wrapperClassName ? <div className={wrapperClassName}>{image}</div> : image;
};

export default PosterImage;
