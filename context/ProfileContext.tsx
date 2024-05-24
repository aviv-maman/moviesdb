'use client';
import { createContext, useContext, useMemo, type ReactNode, type Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { profileReducer } from './profileReducer';
import type { Profile } from '@/lib/database.types';
import type { User } from '@supabase/supabase-js';

export type ProfileStore = {
  state: ProfileContextState;
  dispatch: Dispatch<ProfileActionMap>;
};

const initialContextState = {
  active_view: 'profile',
  supabase_profile: {} as Profile | null,
  supabase_user: {} as User | null,
  favorites: {
    movie: [] as number[],
    tv: [] as number[],
  },
  active_favlist: 'movie',
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
    value: 'profile' | 'integrations';
  };
  changed_supabase_profile: {
    value: Profile | null;
  };
  changed_supabase_user: {
    value: User | null;
  };
  changed_favorite_movie: {
    value: number[];
  };
  changed_favorite_tv: {
    value: number[];
  };
  toggled_favorite_item: {
    value: { media_type: 'movie' | 'tv'; id: number };
  };
  changed_active_favlist: {
    value: 'movie' | 'tv';
  };
};

export type ProfileContextState = typeof initialContextState;
export type ProfileActionMap = ActionMap<ProfilePayload>[keyof ActionMap<ProfilePayload>];

export { ProfileProvider, useProfile };
