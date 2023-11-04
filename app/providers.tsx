'use client';

import { type ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import StyledComponentsRegistry from '@/lib/registry';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { FormProvider } from '@/context/FormContext';
import { SWRConfigProvider } from '@/context/SWRConfigContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <StyledComponentsRegistry>
      <DarkModeProvider>
        <FormProvider>
          <ProfileProvider>
            <NextUIProvider navigate={router.push}>
              <SWRConfigProvider>{children}</SWRConfigProvider>
            </NextUIProvider>
          </ProfileProvider>
        </FormProvider>
      </DarkModeProvider>
    </StyledComponentsRegistry>
  );
}
