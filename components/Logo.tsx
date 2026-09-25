import PosterImage from "@/components/PosterImage";
export default function Logo({ className }: { className?: HTMLElement["className"] }) {
  return (
    <PosterImage
      src="/logo.jpg"
      alt="Logo"
      width={32}
      height={32}
      className={`inline-block size-8 object-contain ${className || ""}`}
    />
  );
}
