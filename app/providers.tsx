"use client";

import type { ReactNode } from "react";
import { DarkModeProvider } from "@/context/DarkModeProvider";
import { FormProvider } from "@/context/FormProvider";
import { ProfileProvider } from "@/context/ProfileProvider";
import { SWRConfigProvider } from "@/context/SWRConfigContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DarkModeProvider>
      <FormProvider>
        <ProfileProvider>
          <SWRConfigProvider>{children}</SWRConfigProvider>
        </ProfileProvider>
      </FormProvider>
    </DarkModeProvider>
  );
}
