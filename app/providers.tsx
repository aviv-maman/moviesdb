'use client';

import { type ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import StyledComponentsRegistry from '@/lib/registry';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { FormProvider } from '@/context/FormContext';
import { SWRConfigProvider } from '@/context/SWRConfigContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <DarkModeProvider>
        <FormProvider>
          <NextUIProvider>
            <SWRConfigProvider>{children}</SWRConfigProvider>
          </NextUIProvider>
        </FormProvider>
      </DarkModeProvider>
    </StyledComponentsRegistry>
  );
}
