import type { FC } from "react";
import PosterImage from "@/components/PosterImage";

interface LogoProps {
  className?: HTMLElement["className"];
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <PosterImage
      src="/logo.jpg"
      alt="Logo"
      width={32}
      height={32}
      className={`inline-block size-8 rounded-md object-contain ${className || ""}`}
    />
  );
};

export default Logo;
