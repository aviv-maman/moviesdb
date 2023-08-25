'use client';

import { type FC } from 'react';
import { Splide, SplideSlide, type Options } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import type { ListResponse, UpcomingListResponse } from '@/lib/api.types';
import CarouselDropdown from './CarouselDropdown';
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
                  <div className='relative aspect-[16/9]  w-auto rounded-md md:aspect-auto'>
                    <img
                      src='https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnwxMTM4MTU1NXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                      alt='AirMax Pro'
                      className='z-0 h-full w-full rounded-md object-cover'
                    />
                    <div className='absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent'></div>
                    <div className='absolute bottom-4 left-4 text-left'>
                      <h1 className='text-lg font-semibold text-white'>Nike Airmax v2</h1>
                      <p className='mt-2 text-sm text-gray-300'>23-08-2023</p>
                      <button className='mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white'>Shop Now &rarr;</button>
                    </div>
                  </div>
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
                        <div className='relative'>
                          <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                          <CarouselDropdown />
                        </div>
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
