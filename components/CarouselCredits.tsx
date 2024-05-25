'use client';
import { Splide, SplideSlide, type Options } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import type { GetMovieResponse } from '@/lib/api.types';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  data: GetMovieResponse['credits'];
}

const CarouselCredits: React.FC<CarouselProps> = ({ data, ...rest }) => {
  const options: Options = {
    gap: '1rem',
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

  const imgClasses = 'z-0 w-full rounded-md object-cover w-auto h-full min-w-auto min-h-full min-w-[159px] md:min-w-[175px]';

  return (
    <div className='w-full' {...rest}>
      <Card className='max-w-full border'>
        <CardBody className='overflow-hidden'>
          <Tabs size='md' aria-label='Tabs section'>
            <Tab key={`tab-${1}`} title={`Cast`}>
              <Splide tag='section' aria-label='Cast Carousel' options={options}>
                {data?.cast?.map((slide, slideIndex) => (
                  <SplideSlide key={slideIndex}>
                    <div className='flex flex-col items-center'>
                      <Image src={`https://image.tmdb.org/t/p/w185${slide?.profile_path}`} alt={slide?.name} className={`${imgClasses} rounded-md`} />
                      <p className='text-sm text-center'>{slide?.name}</p>
                      <p className='text-xs text-center'>{slide?.character}</p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </Tab>
            <Tab key={`tab-${2}`} title={`Crew`}>
              <Splide tag='section' aria-label='Cast Carousel' options={options}>
                {data?.crew?.map((slide, slideIndex) => (
                  <SplideSlide key={slideIndex}>
                    <div className='flex flex-col items-center'>
                      <Image src={`https://image.tmdb.org/t/p/w185${slide?.profile_path}`} alt={slide?.name} className={`${imgClasses} rounded-md`} />
                      <p className='text-sm text-center'>{slide?.name}</p>
                      <p className='text-xs text-center'>{slide?.job}</p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default CarouselCredits;
