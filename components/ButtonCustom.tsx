'use client';
import { type FC } from 'react';
import { Button, ButtonProps } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

interface ButtonCustomProps extends ButtonProps {
  label?: string;
  children?: React.ReactNode;
}

const ButtonCustom: FC<ButtonCustomProps> = ({ label, children, ...rest }) => {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} {...rest}>
      {label || children}
    </Button>
  );
};

export default ButtonCustom;
