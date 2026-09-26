"use client";

import type { FC } from "react";
import { type ComponentProps, type ReactNode, useId } from "react";
import { Input, Label } from "@heroui/react";

interface TextInputProps extends Omit<ComponentProps<typeof Input>, "className"> {
  label?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
  inputClassName?: string;
}

const TextInput: FC<TextInputProps> = ({
  label,
  startContent,
  endContent,
  className = "",
  inputClassName = "",
  id,
  ...props
}) => {
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
};

export default TextInput;
