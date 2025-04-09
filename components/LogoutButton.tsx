'use client';

import type { ButtonProps } from '@heroui/react';
import { Button } from '@heroui/react';

interface LogoutButtonProps extends ButtonProps {
  label?: string;
}

// const LogoutButton: React.FC<LogoutButtonProps> = ({ label = 'Logout', ...props }) => {
//   return <Button className='bg-red-400 opacity-95 hover:bg-red-500' onClick={signOut} {...props}>{label}</Button>;
// };

// export default LogoutButton;

export default function LogoutButton({ label = 'Logout', ...props }: LogoutButtonProps) {
  return (
    <form action='/auth/logout' method='post'>
      <Button className='bg-red-400 opacity-95 hover:bg-red-500' {...props}>
        {label}
      </Button>
    </form>
  );
}
