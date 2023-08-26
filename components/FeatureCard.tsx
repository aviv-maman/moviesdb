'use client';

import { useRef, type FC, useEffect } from 'react';
import './FeatureCard.css';

interface FeatureCardProps {}

const FeatureCard: FC<FeatureCardProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  function mouseMoveEvent(e: MouseEvent) {
    const { current } = containerRef;
    if (!current) return;
    const { x, y } = current.getBoundingClientRect();
    current.style.setProperty('--x', String(e.clientX - x));
    current.style.setProperty('--y', String(e.clientY - y));
  }

  useEffect(() => {
    const { current } = containerRef;
    if (!current) return;
    current.addEventListener('mousemove', mouseMoveEvent);
    return () => current?.removeEventListener('mousemove', mouseMoveEvent);
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className='shiny flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]'
      tabIndex={-1}>
      <div className='flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large gap-2 pb-0'>
        <div className='flex justify-center p-2 rounded-full items-center bg-secondary-100/80 text-pink-500'>SVG</div>
        <p className='text-base font-semibold'>React server components</p>
      </div>
      <div className='relative flex w-full p-5 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased'>
        <p className='font-normal text-base text-default-500'>
          All NextUI components already include the use client directive, which means you can import and use them directly in your RSC.
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
