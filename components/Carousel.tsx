"use client";

import { Card, Tabs } from "@heroui/react";
import type { MovieSeriesPersonListResponse, TrendingResponse, UpcomingMovieListResponse } from "@/lib/api.types";
import CardGeneric from "./CardGeneric";
import ScrollCarousel from "./ScrollCarousel";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[];
  data?: UpcomingMovieListResponse[] | TrendingResponse[] | MovieSeriesPersonListResponse[];
}
const Carousel: React.FC<CarouselProps> = ({ tabs, data, ...rest }) => {
  const resultsArray = data?.map((item) => item?.results);
  return (
    <div className="w-full" {...rest}>
      <Card className="min-h-[263px] border">
        <Card.Content className="overflow-hidden">
          {!tabs /* One carousel => No tabs */ ? (
            <ScrollCarousel label="Media Carousel">
              {resultsArray?.[0]?.map((slide) => (
                <div key={`${"media_type" in slide ? slide.media_type : ""}-${slide.id}`}>
                  <CardGeneric data={slide} />
                </div>
              ))}
            </ScrollCarousel> /* Multiple carousels => Tabs */
          ) : (
            <Tabs>
              <Tabs.ListContainer>
                <Tabs.List aria-label="Carousel categories">
                  {tabs.map((tab) => (
                    <Tabs.Tab key={tab} id={tab}>
                      {tab}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.ListContainer>
              {resultsArray?.map((results, resultsIndex) => (
                <Tabs.Panel key={tabs[resultsIndex]} id={tabs[resultsIndex]}>
                  <ScrollCarousel label="Media Carousel">
                    {results?.map((slide) => (
                      <div key={`${"media_type" in slide ? slide.media_type : ""}-${slide.id}`}>
                        <CardGeneric data={slide} />
                      </div>
                    ))}
                  </ScrollCarousel>
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
