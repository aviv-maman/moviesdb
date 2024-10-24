'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { FormProvider } from '@/context/FormContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { SWRConfigProvider } from '@/context/SWRConfigContext';
import StyledComponentsRegistry from '@/lib/registry';

export function Providers({ children }: { children: React.ReactNode }) {
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
