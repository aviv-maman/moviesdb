"use client";
import "@splidejs/react-splide/css";

import { Card, Tabs } from "@heroui/react";
import { type Options, Splide, SplideSlide } from "@splidejs/react-splide";
import type { MovieSeriesPersonListResponse, TrendingResponse, UpcomingMovieListResponse } from "@/lib/api.types";
import CardGeneric from "./CardGeneric";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[];
  data?: UpcomingMovieListResponse[] | TrendingResponse[] | MovieSeriesPersonListResponse[];
}
const Carousel: React.FC<CarouselProps> = ({ tabs, data, ...rest }) => {
  const resultsArray = data?.map((item) => item?.results);
  const options: Options = {
    gap: "1rem",
    perPage: 6,
    pagination: false,
    breakpoints: {
      388: {
        perPage: 1,
      },
      640: {
        perPage: 2,
      },
      824: {
        perPage: 3,
      },
      1024: {
        perPage: 4,
      },
      1280: {
        perPage: 5,
      },
    },
  };
  return (
    <div className="w-full" {...rest}>
      <Card className="min-h-[263px] border">
        <Card.Content className="min-w-0 overflow-hidden">
          {!tabs /* One carousel => No tabs */ ? (
            <Splide tag="section" aria-label="Media Carousel" options={options}>
              {resultsArray?.[0]?.map((slide) => (
                <SplideSlide key={`${"media_type" in slide ? slide.media_type : ""}-${slide.id}`}>
                  <CardGeneric data={slide} />
                </SplideSlide>
              ))}
            </Splide> /* Multiple carousels => Tabs */
          ) : (
            <Tabs className="min-w-0 w-full">
              <Tabs.List
                aria-label="Carousel categories"
                className="grid w-full min-w-0 grid-flow-col auto-cols-fr rounded-lg bg-default p-1">
                {tabs.map((tab) => (
                  <Tabs.Tab
                    className="min-w-0 w-auto rounded-md px-2 data-[selected=true]:bg-surface data-[selected=true]:shadow-sm"
                    key={tab}
                    id={tab}>
                    {tab}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              {resultsArray?.map((results, resultsIndex) => (
                <Tabs.Panel key={tabs[resultsIndex]} id={tabs[resultsIndex]}>
                  <Splide tag="section" aria-label="Media Carousel" options={options}>
                    {results?.map((slide) => (
                      <SplideSlide key={`${"media_type" in slide ? slide.media_type : ""}-${slide.id}`}>
                        <CardGeneric data={slide} />
                      </SplideSlide>
                    ))}
                  </Splide>
                </Tabs.Panel>
              ))}
            </Tabs>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};
export default Carousel;
