"use client";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps, Spinner } from "@heroui/react";

interface ButtonCustomProps extends Omit<ButtonProps, "children"> {
  label?: string;
  children?: React.ReactNode;
}
export default function ButtonCustom({ label, children, isPending, isDisabled, ...props }: ButtonCustomProps) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} isPending={pending || isPending} isDisabled={pending || isDisabled}>
      {pending || isPending ? <Spinner size="sm" /> : null}
      {label || children}
    </Button>
  );
}
