"use client";

import type { FC, ReactNode } from "react";
import { Toast } from "@heroui/react";
import { DarkModeProvider } from "@/context/DarkModeProvider";
import { FormProvider } from "@/context/FormProvider";
import { ProfileProvider } from "@/context/ProfileProvider";
import { SWRConfigProvider } from "@/context/SWRConfigContext";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <DarkModeProvider>
      <Toast.Provider placement="bottom end" />
      <FormProvider>
        <ProfileProvider>
          <SWRConfigProvider>{children}</SWRConfigProvider>
        </ProfileProvider>
      </FormProvider>
    </DarkModeProvider>
  );
};
