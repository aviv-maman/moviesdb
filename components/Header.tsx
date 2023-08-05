'use client';
import { type FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import LogoutButton from './LogoutButton';
import { type User } from '@supabase/supabase-js';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

type HeaderProps = {
  user?: User | null | undefined;
};

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    // <StyledHeader>
    //   <StyledHeaderMenu>
    //     <li>
    //       <DarkModeToggle />
    //     </li>
    //     <li>
    //       <DarkModeToggle />
    //     </li>
    //   </StyledHeaderMenu>
    // </StyledHeader>

    <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground'>
        <div />
        <DarkModeToggle />
        <div>
          {user ? (
            <div className='flex items-center gap-4'>
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link href='/login' className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
