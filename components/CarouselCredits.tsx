"use client";
import "@splidejs/react-splide/css";

import { Card, Tabs } from "@heroui/react";
import { type Options, Splide, SplideSlide } from "@splidejs/react-splide";
import PosterImage from "@/components/PosterImage";
import type { GetMovieResponse } from "@/lib/api.types";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  data: GetMovieResponse["credits"];
}
const CarouselCredits: React.FC<CarouselProps> = ({ data, ...rest }) => {
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
  const imgClasses =
    "z-0 w-full rounded-md object-cover w-auto h-full min-w-auto min-h-full min-w-[159px] md:min-w-[175px] min-h-[263px]";
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
              <Splide tag="section" aria-label="Cast Carousel" options={options}>
                {data?.cast?.map((slide) => (
                  <SplideSlide key={slide.credit_id}>
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
                  </SplideSlide>
                ))}
              </Splide>
            </Tabs.Panel>
            <Tabs.Panel key={`tab-${2}`} id={`tab-${2}`}>
              <Splide tag="section" aria-label="Cast Carousel" options={options}>
                {data?.crew?.map((slide) => (
                  <SplideSlide key={slide.credit_id}>
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
                  </SplideSlide>
                ))}
              </Splide>
            </Tabs.Panel>
          </Tabs>
        </Card.Content>
      </Card>
    </div>
  );
};
export default CarouselCredits;
