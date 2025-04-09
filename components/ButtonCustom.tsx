'use client';

import type { ButtonProps } from '@heroui/react';
import { Button } from '@heroui/react';
import { useFormStatus } from 'react-dom';

interface ButtonCustomProps extends ButtonProps {
  label?: string;
  children?: React.ReactNode;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ label, children, ...rest }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      isLoading={pending}
      disabled={pending}
      aria-disabled={pending}
      {...rest}
      startContent={!pending && rest.startContent}
      endContent={!pending && rest.endContent}>
      {label || children}
    </Button>
  );
};

export default ButtonCustom;
