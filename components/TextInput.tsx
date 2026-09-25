"use client";
import { type ComponentProps, type ReactNode, useId } from "react";
import { Input, Label } from "@heroui/react";

type TextInputProps = Omit<ComponentProps<typeof Input>, "className"> & {
  label?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
  inputClassName?: string;
};
export default function TextInput({
  label,
  startContent,
  endContent,
  className = "",
  inputClassName = "",
  id,
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className="flex items-center gap-2">
        {startContent}
        <Input {...props} id={inputId} className={`min-w-0 w-full ${inputClassName}`} />
        {endContent}
      </div>
    </div>
  );
}
