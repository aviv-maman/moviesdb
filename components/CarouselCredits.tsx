"use client";

import { Card, Tabs } from "@heroui/react";
import PosterImage from "@/components/PosterImage";
import type { GetMovieResponse } from "@/lib/api.types";
import ScrollCarousel from "./ScrollCarousel";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  data: GetMovieResponse["credits"];
}
const CarouselCredits: React.FC<CarouselProps> = ({ data, ...rest }) => {
  const imgClasses = "w-full aspect-[2/3] rounded-md object-cover";
  return (
    <div className="w-full" {...rest}>
      <Card className="max-w-full border">
        <Card.Content className="overflow-hidden">
          <Tabs>
            <Tabs.ListContainer>
              <Tabs.List aria-label="Carousel categories">
                <Tabs.Tab key={`tab-${1}`} id={`tab-${1}`}>
                  {`Cast`}
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab key={`tab-${2}`} id={`tab-${2}`}>
                  {`Crew`}
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel key={`tab-${1}`} id={`tab-${1}`}>
              <ScrollCarousel label="Cast Carousel">
                {data?.cast?.map((slide) => (
                  <div key={slide.credit_id}>
                    <div className="flex flex-col items-center">
                      <PosterImage
                        src={`https://image.tmdb.org/t/p/w185${slide?.profile_path}`}
                        alt={slide?.name}
                        className={`${imgClasses} rounded-md`}
                        fallbackSrc={"./no-image.jpg"}
                      />
                      <p className="text-center text-sm">{slide?.name}</p>
                      <p className="text-center text-xs">{slide?.character}</p>
                    </div>
                  </div>
                ))}
              </ScrollCarousel>
            </Tabs.Panel>
            <Tabs.Panel key={`tab-${2}`} id={`tab-${2}`}>
              <ScrollCarousel label="Crew Carousel">
                {data?.crew?.map((slide) => (
                  <div key={slide.credit_id}>
                    <div className="flex flex-col items-center">
                      <PosterImage
                        src={`https://image.tmdb.org/t/p/w185${slide?.profile_path}`}
                        alt={slide?.name}
                        className={`${imgClasses} rounded-md`}
                        fallbackSrc={"./no-image.jpg"}
                      />
                      <p className="text-center text-sm">{slide?.name}</p>
                      <p className="text-center text-xs">{slide?.job}</p>
                    </div>
                  </div>
                ))}
              </ScrollCarousel>
            </Tabs.Panel>
          </Tabs>
        </Card.Content>
      </Card>
    </div>
  );
};
export default CarouselCredits;
