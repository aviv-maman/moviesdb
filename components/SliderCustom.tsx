'use client';

import { type ComponentProps, type FC } from 'react';
import { Slider, RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface SliderCustomProps {
  type?: 'slider' | 'range';
  min?: number;
  max?: number;
  step?: number;
  marksInterval?: number;
  title?: string;
  className?: ComponentProps<'div'>['className'];
}

const SliderCustom: FC<SliderCustomProps> = ({ type = 'slider', min = 0, max = 10, step = 1, marksInterval = 1, ...props }) => {
  return (
    <>
      {props.title && <span className='relative text-medium text-foreground-500 mb-1'>{props.title}</span>}
      <div className={`pl-0 pr-0 ` + props.className}>
        {type === 'slider' ? (
          <Slider
            defaultValue={min}
            min={min}
            max={max}
            step={step}
            graduated
            progress
            renderMark={(mark) => {
              if (mark % 2 !== 0) return;
              return <span className='text-xs text-gray-400 dark:text-gray-500'>{mark}</span>;
            }}
            barClassName='mr-1'
            className='mr-2.5 ml-2.5'
          />
        ) : (
          <RangeSlider
            defaultValue={[min, max]}
            min={min}
            max={max}
            step={step}
            graduated
            progress
            renderMark={(mark) => {
              if (mark % marksInterval !== 0) return;
              return <span className='text-xs text-gray-400 dark:text-gray-500'>{mark}</span>;
            }}
            barClassName='mr-1'
            className='mr-2.5 ml-2.5'
          />
        )}
      </div>
    </>
  );
};

export default SliderCustom;
