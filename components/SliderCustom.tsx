"use client";

import type { FC } from "react";
import { Label, Slider, type SliderProps } from "@heroui/react";
import { useFilterDraft } from "@/context/FilterDraftContext";

interface SliderCustomProps {
  label: string;
  name: string;
  showMarks?: boolean;
  marksInterval?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  defaultValue?: SliderProps["defaultValue"];
}

const SliderCustom: FC<SliderCustomProps> = ({
  label,
  name,
  showMarks = true,
  marksInterval,
  minValue = 0,
  maxValue = 10,
  step = 1,
  ...props
}) => {
  const { values } = useFilterDraft();
  const initialValue = values[name]?.map(Number);
  const interval = marksInterval || step;
  const marks = Array.from(
    { length: Math.floor((maxValue - minValue) / interval) + 1 },
    (_, index) => minValue + index * interval,
  );

  return (
    <Slider
      {...props}
      defaultValue={initialValue ? (initialValue.length === 1 ? initialValue[0] : initialValue) : props.defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      aria-label={label}
      className="px-1">
      <Label>{label}</Label>
      <Slider.Output />
      <Slider.Track>
        {({ state }) => (
          <>
            <Slider.Fill />
            {state.values.map((_, index) => (
              <Slider.Thumb
                key={index === 0 ? "minimum" : "maximum"}
                index={index}
                name={name}
                aria-label={state.values.length > 1 ? label + (index === 0 ? " minimum" : " maximum") : label}
              />
            ))}
          </>
        )}
      </Slider.Track>
      {showMarks && (
        <div aria-hidden="true" className="flex justify-between text-xs text-muted">
          {marks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      )}
    </Slider>
  );
};

export default SliderCustom;
