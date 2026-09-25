"use client";

import { HeroUIProvider } from "@heroui/react";
import { DarkModeProvider } from "@/context/DarkModeProvider";
import { FormProvider } from "@/context/FormProvider";
import { ProfileProvider } from "@/context/ProfileProvider";
import { SWRConfigProvider } from "@/context/SWRConfigContext";
import { useIsClient } from "@/hooks/useIsClient";

export function Providers({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return isClient ? (
    <DarkModeProvider>
      <FormProvider>
        <ProfileProvider>
          <HeroUIProvider>
            <SWRConfigProvider>{children}</SWRConfigProvider>
          </HeroUIProvider>
        </ProfileProvider>
      </FormProvider>
    </DarkModeProvider>
  ) : null;
}
