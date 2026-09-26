"use client";

import type { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps, Spinner } from "@heroui/react";

interface ButtonCustomProps extends Omit<ButtonProps, "children"> {
  label?: string;
  children?: ReactNode;
}

const ButtonCustom: FC<ButtonCustomProps> = ({ label, children, isPending, isDisabled, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} isPending={pending || isPending} isDisabled={pending || isDisabled}>
      {pending || isPending ? <Spinner size="sm" /> : null}
      {label || children}
    </Button>
  );
};

export default ButtonCustom;
