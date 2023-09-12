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
      {props.title && <span className='relative text-medium text-foreground-500 mx-3 mb-1'>{props.title}</span>}
      <div className={`mx-6 ` + props.className}>
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
          />
        )}
      </div>
    </>
  );
};

export default SliderCustom;
