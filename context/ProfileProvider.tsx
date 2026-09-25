"use client";

import { useMemo } from "react";
import { useImmerReducer } from "use-immer";
import { initialContextState, ProfileContext } from "./ProfileContext";
import { profileReducer } from "./profileReducer";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer(profileReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
}
