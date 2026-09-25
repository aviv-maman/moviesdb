"use client";

import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { type Options, Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
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
        <CardBody className="overflow-hidden">
          {!tabs ? (
            /* One carousel => No tabs */
            <Splide tag="section" aria-label="Media Carousel" options={options}>
              {resultsArray?.[0]?.map((slide) => (
                <SplideSlide key={`${"media_type" in slide ? slide.media_type : ""}-${slide.id}`}>
                  <CardGeneric data={slide} />
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            /* Multiple carousels => Tabs */
            <Tabs size="md" aria-label="Tabs section">
              {resultsArray?.map((results, resultsIndex) => (
                <Tab key={tabs[resultsIndex]} title={tabs ? tabs[resultsIndex] : resultsIndex + 1}>
                  <Splide tag="section" aria-label="Media Carousel" options={options}>
                    {results?.map((slide) => (
                      <SplideSlide key={`${"media_type" in slide ? slide.media_type : ""}-${slide.id}`}>
                        <CardGeneric data={slide} />
                      </SplideSlide>
                    ))}
                  </Splide>
                </Tab>
              ))}
            </Tabs>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Carousel;
