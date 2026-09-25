"use client";

import { Checkbox, type CheckboxProps, Label } from "@heroui/react";

interface CheckboxGenreProps extends CheckboxProps {
  label: string;
}
export default function CheckboxGenre({ label, className, ...props }: CheckboxGenreProps) {
  return (
    <Checkbox
      {...props}
      className={
        "rounded-full border px-2 py-1 text-sm data-[selected=true]:border-accent data-[selected=true]:bg-accent-soft " +
        (className || "")
      }>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>{label}</Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
