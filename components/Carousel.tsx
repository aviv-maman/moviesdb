'use client';

import { type FC } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import type { ListResponse } from '@/lib/api.types';
interface CarouselProps {
  descriptions?: string[];
  tabs?: string[];
  data: ListResponse[];
}

const Carousel: FC<CarouselProps> = ({ descriptions, tabs, data }) => {
  const resultsArray = data.map((item) => item.results);

  return (
    <div className='max-w-[1400px] w-full m-auto'>
      <Card className='max-w-full'>
        <CardBody className='overflow-hidden'>
          <Tabs size='md' aria-label='Tabs form'>
            {resultsArray.map((results, resultsIndex) => (
              <Tab key={`tab-${resultsIndex}`} title={tabs ? tabs[resultsIndex] : undefined}>
                <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 3 }}>
                  {results.map((slide, slideIndex) => (
                    <SplideSlide key={slideIndex}>
                      <Image src={`https://image.tmdb.org/t/p/w342/${slide.poster_path}`} alt='Picture of the author' width={400} height={500} />
                    </SplideSlide>
                  ))}
                </Splide>
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Carousel;
