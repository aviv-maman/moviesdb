import type { FC, ReactNode } from "react";
import Link from "next/link";
import CatalogFilters from "./CatalogFilters";

const categories = {
  movies: [
    ["popular", "Popular"],
    ["now-playing", "Now playing"],
    ["top-rated", "Top rated"],
    ["upcoming", "Upcoming"],
  ],
  series: [
    ["popular", "Popular"],
    ["on-the-air", "On the air"],
    ["top-rated", "Top rated"],
    ["airing-today", "Airing today"],
  ],
};

interface CatalogLayoutProps {
  media: "movies" | "series";
  category: string;
  children: ReactNode;
}

const CatalogLayout: FC<CatalogLayoutProps> = ({ media, category, children }) => {
  return (
    <main className="mx-auto min-h-[calc(100dvh-146px)] w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Discover</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{media === "movies" ? "Movies" : "Series"}</h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          {media === "movies" ? "Find your next movie night." : "Find your next great series."}
        </p>
      </div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b pb-5">
        <nav aria-label={`${media} categories`} className="flex max-w-full gap-1 overflow-x-auto">
          {categories[media].map(([value, label]) => (
            <Link
              key={value}
              href={`/${media}/${value}`}
              aria-current={value === category ? "page" : undefined}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${value === category ? "bg-foreground text-background" : "text-muted hover:bg-default hover:text-foreground"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <CatalogFilters key={`${media}/${category}`} />
      </div>
      {children}
    </main>
  );
};

export default CatalogLayout;
