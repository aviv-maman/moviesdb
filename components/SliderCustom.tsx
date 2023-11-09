'use client';

import { type FC } from 'react';
import { Slider, type SliderProps } from '@nextui-org/react';

interface SliderCustomProps extends SliderProps {
  showMarks?: boolean;
  marksInterval?: number;
}

const SliderCustom: FC<SliderCustomProps> = ({ showMarks = true, marksInterval, ...props }) => {
  const renderMarks = () => {
    marksInterval = marksInterval ? marksInterval : props.step ? props.step : 1;
    const marksArray = [];
    const maxValue = props.maxValue || 10;
    for (let i = 0; i <= maxValue; i += marksInterval) {
      marksArray.push({ value: i, label: `${i}` });
    }
    return marksArray;
  };

  return (
    <Slider
      aria-label={`${props.label}`}
      showSteps
      showTooltip
      marks={showMarks ? renderMarks() : undefined}
      color='foreground'
      classNames={{ mark: 'text-xs text-slate-600 dark:text-slate-400' }}
      minValue={props.minValue || 0}
      {...props}
    />
  );
};

export default SliderCustom;
