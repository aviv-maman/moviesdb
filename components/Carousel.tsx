"use client";

import { Tabs } from "@heroui/react";
import type { MovieSeriesPersonListResponse, TrendingResponse, UpcomingMovieListResponse } from "@/lib/api.types";
import CardGeneric from "./CardGeneric";
import DetailRail from "./DetailRail";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[];
  data?: UpcomingMovieListResponse[] | TrendingResponse[] | MovieSeriesPersonListResponse[];
}

export default function Carousel({ tabs, data, ...rest }: CarouselProps) {
  const panels = data?.map((group, index) => {
    const label = tabs?.[index] ?? "Media";
    return (
      <DetailRail key={label} label={label.toLowerCase()}>
        {group?.results.map((slide) => (
          <div key={slide.id} className="min-w-0 snap-start">
            <CardGeneric data={slide} variant="catalog" />
          </div>
        ))}
      </DetailRail>
    );
  });
  return (
    <div className="min-w-0 w-full" {...rest}>
      {tabs ? (
        <Tabs className="min-w-0 w-full">
          <Tabs.List aria-label="Carousel categories" className="flex w-full gap-1 border-b bg-transparent pb-4">
            {tabs.map((tab) => (
              <Tabs.Tab
                key={tab}
                id={tab}
                className="min-w-0 w-auto rounded-lg px-3 py-2 text-sm font-medium text-muted data-[selected=true]:bg-foreground data-[selected=true]:text-background">
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={tab} id={tab} className="min-w-0 px-0 pt-0">
              {panels?.[index]}
            </Tabs.Panel>
          ))}
        </Tabs>
      ) : (
        panels?.[0]
      )}
    </div>
  );
}
