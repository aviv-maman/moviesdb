"use client";

import type { MovieSeriesPersonListResponse, TrendingResponse, UpcomingMovieListResponse } from "@/lib/api.types";
import CardGeneric from "./CardGeneric";
import CarouselRail from "./CarouselRail";
import CarouselTabs from "./CarouselTabs";

interface CarouselProps {
  tabs?: string[];
  data?: UpcomingMovieListResponse[] | TrendingResponse[] | MovieSeriesPersonListResponse[];
}

export default function Carousel({ tabs, data }: CarouselProps) {
  const panels = data?.map((group, index) => {
    const label = tabs?.[index] ?? "Media";

    return (
      <CarouselRail key={label} label={label.toLowerCase()}>
        {group?.results.map((slide) => (
          <div key={slide.id} className="min-w-0 snap-start">
            <CardGeneric data={slide} variant="catalog" />
          </div>
        ))}
      </CarouselRail>
    );
  });

  return (
    <div className="min-w-0 w-full">
      {tabs ? (
        <CarouselTabs
          label="Carousel categories"
          items={tabs.map((tab, index) => ({ id: tab, label: tab, content: panels?.[index] }))}
        />
      ) : (
        panels?.[0]
      )}
    </div>
  );
}
