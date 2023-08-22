'use client';

import { type FC } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import type { ListResponse, UpcomingListResponse } from '@/lib/api.types';
interface CarouselProps {
  tabs?: string[];
  data: ListResponse[] | UpcomingListResponse[];
}

const Carousel: FC<CarouselProps> = ({ tabs, data }) => {
  const resultsArray = data.map((item) => item.results);

  return (
    <div className='max-w-[1400px] w-full m-auto'>
      <Card className='max-w-full'>
        <CardBody className='overflow-hidden'>
          {/* One carousel => No tabs */}

          {!tabs ? (
            <>
              <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 2 }} className='block sm:hidden'>
                {resultsArray[0].map((slide, slideIndex) => (
                  <SplideSlide key={slideIndex}>
                    <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                  </SplideSlide>
                ))}
              </Splide>

              <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 3 }} className='hidden sm:max-md:block'>
                {resultsArray[0].map((slide, slideIndex) => (
                  <SplideSlide key={slideIndex}>
                    <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                  </SplideSlide>
                ))}
              </Splide>

              <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 4 }} className='hidden md:max-lg:block'>
                {resultsArray[0].map((slide, slideIndex) => (
                  <SplideSlide key={slideIndex}>
                    <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                  </SplideSlide>
                ))}
              </Splide>

              <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 6 }} className='hidden lg:block'>
                {resultsArray[0].map((slide, slideIndex) => (
                  <SplideSlide key={slideIndex}>
                    <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                  </SplideSlide>
                ))}
              </Splide>
            </>
          ) : (
            /* Multiple carousels => Tabs */
            <Tabs size='md' aria-label='Tabs section'>
              {resultsArray.map((results, resultsIndex) => (
                <Tab key={`tab-${resultsIndex}`} title={tabs ? tabs[resultsIndex] : resultsIndex + 1}>
                  <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 2 }} className='block sm:hidden'>
                    {results.map((slide, slideIndex) => (
                      <SplideSlide key={slideIndex}>
                        <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                      </SplideSlide>
                    ))}
                  </Splide>

                  <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 3 }} className='hidden sm:max-md:block'>
                    {results.map((slide, slideIndex) => (
                      <SplideSlide key={slideIndex}>
                        <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                      </SplideSlide>
                    ))}
                  </Splide>

                  <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 4 }} className='hidden md:max-lg:block'>
                    {results.map((slide, slideIndex) => (
                      <SplideSlide key={slideIndex}>
                        <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
                      </SplideSlide>
                    ))}
                  </Splide>

                  <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 6 }} className='hidden lg:block'>
                    {results.map((slide, slideIndex) => (
                      <SplideSlide key={slideIndex}>
                        <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Poster' width={400} height={500} />
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
