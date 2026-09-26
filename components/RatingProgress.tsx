"use client";

import type { FC, ReactNode } from "react";
import { ProgressCircle, type ProgressCircleProps } from "@heroui/react";

interface RatingProgressProps extends Omit<ProgressCircleProps, "color"> {
  color?: string;
  valueLabel?: ReactNode;
}

const RatingProgress: FC<RatingProgressProps> = ({
  value = 0,
  valueLabel,
  color,
  className = "",
  size = "md",
  ...props
}) => {
  const colors: Record<string, ProgressCircleProps["color"]> = {
    success: "success",
    warning: "warning",
    danger: "danger",
    primary: "accent",
    default: "default",
  };

  return (
    <ProgressCircle
      {...props}
      size={size}
      color={colors[color || "default"]}
      value={value}
      className={`relative ${className}`}>
      <ProgressCircle.Track className={size === "sm" ? "size-9" : "size-12"}>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {valueLabel ?? Math.round(value)}
      </span>
    </ProgressCircle>
  );
};

export default RatingProgress;
