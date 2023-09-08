'use client';

import { type FC } from 'react';
import { Button, ButtonProps } from '@nextui-org/react';

interface ButtonCustomProps extends ButtonProps {
  label?: string;
}

const ButtonCustom: FC<ButtonCustomProps> = ({ label, ...rest }) => {
  return <Button {...rest}>{label}</Button>;
};

export default ButtonCustom;
