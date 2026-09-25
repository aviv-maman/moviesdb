import { Image } from './HeroUI';

export default function Logo({ className }: { className?: HTMLElement['className'] }) {
  return <Image src='/logo.jpg' alt='Logo' className={`inline-block h-8 ${className}`} />;
}
