'use client';

import { type FC } from 'react';
import { Splide, SplideSlide, type Options } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import type { ListResponse, UpcomingListResponse } from '@/lib/api.types';
import MovieCard from './MovieCard';

interface CarouselProps {
  tabs?: string[];
  data: ListResponse[] | UpcomingListResponse[];
}

const Carousel: FC<CarouselProps> = ({ tabs, data }) => {
  const resultsArray = data.map((item) => item.results);
  const options: Options = {
    gap: '1rem',
    perPage: 6,
    pagination: false,
    breakpoints: {
      640: {
        perPage: 2,
      },
      768: {
        perPage: 3,
      },
      1024: {
        perPage: 4,
      },
    },
  };

  return (
    <div className='max-w-[1400px] w-full m-auto'>
      <Card className='max-w-full'>
        <CardBody className='overflow-hidden'>
          {!tabs ? (
            /* One carousel => No tabs */
            <Splide tag='section' aria-label='Movies Carousel' options={options}>
              {resultsArray[0].map((slide, slideIndex) => (
                <SplideSlide key={slideIndex}>
                  <MovieCard data={slide} />
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            /* Multiple carousels => Tabs */
            <Tabs size='md' aria-label='Tabs section'>
              {resultsArray.map((results, resultsIndex) => (
                <Tab key={`tab-${resultsIndex}`} title={tabs ? tabs[resultsIndex] : resultsIndex + 1}>
                  <Splide tag='section' aria-label='Movies Carousel' options={options}>
                    {results.map((slide, slideIndex) => (
                      <SplideSlide key={slideIndex}>
                        <MovieCard data={slide} />
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
