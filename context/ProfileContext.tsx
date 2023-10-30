'use client';

import { createContext, useContext, useMemo, type ReactNode, type Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { profileReducer } from './profileReducer';
import type { Profile } from '@/lib/database.types';

export type ProfileStore = {
  state: ProfileContextState;
  dispatch: Dispatch<ProfileActionMap>;
};

const initialContextState = {
  active_view: 'profile',
  supabase_profile: {} as Profile | null,
};

const ProfileContext = createContext<ProfileStore>({ dispatch: () => {}, state: initialContextState });

function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(profileReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
}

function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) throw new Error('ProfileContext was used outside of the ProfileProvider');
  return context;
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type ProfilePayload = {
  changed_active_view: {
    value: 'profile' | 'tmdb';
  };
  changed_supabase_profile: {
    value: Profile | null;
  };
};

export type ProfileContextState = typeof initialContextState;
export type ProfileActionMap = ActionMap<ProfilePayload>[keyof ActionMap<ProfilePayload>];

export { ProfileProvider, useProfile };
