'use client';

import { type ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import StyledComponentsRegistry from '@/lib/registry';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { FormProvider } from '@/context/FormContext';
import { SWRConfigProvider } from '@/context/SWRConfigContext';
import { ProfileProvider } from '@/context/ProfileContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <DarkModeProvider>
        <FormProvider>
          <ProfileProvider>
            <NextUIProvider>
              <SWRConfigProvider>{children}</SWRConfigProvider>
            </NextUIProvider>
          </ProfileProvider>
        </FormProvider>
      </DarkModeProvider>
    </StyledComponentsRegistry>
  );
}
