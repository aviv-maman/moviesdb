'use client';

import type { ButtonProps } from '@heroui/react';
import { Button } from '@heroui/react';

interface LogoutButtonProps extends ButtonProps {
  label?: string;
}

export default function LogoutButton({ label = 'Logout', ...props }: LogoutButtonProps) {
  return (
    <form action='/auth/logout' method='post'>
      <Button className='bg-red-400 opacity-95 hover:bg-red-500' {...props}>
        {label}
      </Button>
    </form>
  );
}
