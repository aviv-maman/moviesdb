"use client";

import type { FC, ReactNode } from "react";
import { useMemo, useReducer } from "react";
import { initialContextState, ProfileContext } from "./ProfileContext";
import { profileReducer } from "./profileReducer";

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
};
