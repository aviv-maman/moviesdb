'use client';

import { Button, ButtonProps } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
// import { FC } from 'react';

interface LogoutButtonProps extends ButtonProps {
  label?: string;
}

// const LogoutButton: FC<LogoutButtonProps> = ({ label = 'Logout', ...props }) => {
//   return <Button className='bg-red-400 opacity-95 hover:bg-red-500' onClick={signOut} {...props}>{label}</Button>;
// };

// export default LogoutButton;

export default function LogoutButton({ label = 'Logout', ...props }: LogoutButtonProps) {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button className='bg-red-400 opacity-95 hover:bg-red-500' onClick={signOut} {...props}>
      {label}
    </Button>
  );
}
