'use client';
import { type ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import StyledComponentsRegistry from '@/lib/registry';
import { DarkModeProvider } from '@/context/DarkModeContext';
export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <DarkModeProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </DarkModeProvider>
    </StyledComponentsRegistry>
  );
}
