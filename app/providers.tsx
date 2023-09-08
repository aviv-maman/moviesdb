'use client';

import { type ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import StyledComponentsRegistry from '@/lib/registry';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { FormProvider } from '@/context/FormContext';
export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <DarkModeProvider>
        <FormProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </FormProvider>
      </DarkModeProvider>
    </StyledComponentsRegistry>
  );
}
