'use client';

import { type FC } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Image } from '@nextui-org/react';

interface CarouselProps {}

const Carousel: FC<CarouselProps> = ({}) => {
  const slides = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format',
    'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format',
    'https://plus.unsplash.com/premium_photo-1675804669860-9e27f22b0681?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    'https://plus.unsplash.com/premium_photo-1675804669838-623a874bc34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    'https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    'https://images.unsplash.com/photo-1691441131439-19b4587e30d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
    'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
  ];

  return (
    <div className='max-w-[1400px] w-full m-auto'>
      <Splide tag='section' aria-label='Movies Carousel' options={{ gap: '1rem', perPage: 3 }}>
        {slides.map((slide, slideIndex) => (
          <SplideSlide key={slideIndex}>
            <Image src={slide} alt='Picture of the author' width={400} height={500} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;
