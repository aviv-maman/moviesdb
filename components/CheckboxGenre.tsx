"use client";

import type { FC } from "react";
import { Checkbox, Label } from "@heroui/react";

interface CheckboxGenreProps {
  label: string;
  value: string;
  className?: string;
  "aria-label"?: string;
}

const CheckboxGenre: FC<CheckboxGenreProps> = ({ label, className, ...props }) => {
  return (
    <Checkbox
      {...props}
      className={
        "rounded-full border px-2 py-1 text-sm data-[selected=true]:border-accent data-[selected=true]:bg-accent-soft " +
        (className || "")
      }>
      <Checkbox.Content>
        <Checkbox.Control className="border border-slate-400 dark:border-slate-500">
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>{label}</Label>
      </Checkbox.Content>
    </Checkbox>
  );
};

export default CheckboxGenre;
