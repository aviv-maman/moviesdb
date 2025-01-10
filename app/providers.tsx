'use client';

import { NextUIProvider } from '@nextui-org/react';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { FormProvider } from '@/context/FormContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { SWRConfigProvider } from '@/context/SWRConfigContext';
import { useIsClient } from '@/hooks/useIsClient';

export function Providers({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return isClient ? (
    <DarkModeProvider>
      <FormProvider>
        <ProfileProvider>
          <NextUIProvider>
            <SWRConfigProvider>{children}</SWRConfigProvider>
          </NextUIProvider>
        </ProfileProvider>
      </FormProvider>
    </DarkModeProvider>
  ) : null;
}
