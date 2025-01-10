'use client';

import { useEffect, useRef } from 'react';
import '@/styles/feature-card.css';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  icon: string[];
  isLinkingRequired?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, subtitle, icon, isLinkingRequired }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  function mouseMoveEvent(e: MouseEvent) {
    const { current } = containerRef;
    if (!current) return;
    const { left, top } = current.getBoundingClientRect();
    current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
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
      className='card relative box-border flex h-auto flex-col overflow-hidden rounded-large border bg-default-400/25 text-foreground shadow-medium outline-none backdrop-blur-lg backdrop-saturate-[1.8] transition-transform-background data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus motion-reduce:transition-none dark:bg-default-400/10'
      tabIndex={-1}>
      <div className='z-10 flex w-full shrink-0 items-center justify-start gap-2 rounded-t-large p-3 pb-0 subpixel-antialiased'>
        <div className='flex items-center justify-center rounded-full bg-secondary-200/80 p-2 text-indigo-600 dark:bg-secondary-200 dark:text-indigo-500'>
          <svg width={24} height={24} viewBox='0 0 24 24' fill='none' className='opacity-80 group-hover:opacity-100'>
            {icon.map((path) => (
              <path
                key={path}
                d={path}
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            ))}
          </svg>
        </div>
        <p className='text-base font-semibold'>{title}</p>
      </div>
      <div className='relative flex h-auto w-full flex-auto flex-col justify-between overflow-y-auto break-words p-5 text-left subpixel-antialiased'>
        <p className='text-sm text-slate-500 opacity-70 dark:text-slate-400'>{subtitle}</p>
        {isLinkingRequired && (
          <span className='pt-3 text-tiny text-slate-500 dark:text-slate-400'>
            *Linking your account to TMDB service is required.
          </span>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
