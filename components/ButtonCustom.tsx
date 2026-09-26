"use client";

import type { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps, Spinner } from "@heroui/react";

interface ButtonCustomProps {
  label?: string;
  children?: ReactNode;
  type?: ButtonProps["type"];
  className?: string;
  variant?: ButtonProps["variant"];
  id?: string;
  isIconOnly?: boolean;
  size?: ButtonProps["size"];
  "aria-label"?: string;
  isDisabled?: boolean;
  isPending?: boolean;
  onPress?: ButtonProps["onPress"];
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
