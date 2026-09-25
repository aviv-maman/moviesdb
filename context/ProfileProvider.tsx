"use client";

import { useMemo, useReducer } from "react";
import { initialContextState, ProfileContext } from "./ProfileContext";
import { profileReducer } from "./profileReducer";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
}
