'use client';

import { type FC } from 'react';
import { Button, ButtonProps } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

interface ButtonCustomProps extends ButtonProps {
  label?: string;
}

const ButtonCustom: FC<ButtonCustomProps> = ({ label, ...rest }) => {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} {...rest}>
      {label}
    </Button>
  );
};

export default ButtonCustom;
