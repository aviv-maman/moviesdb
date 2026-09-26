"use client";

import type { Dispatch } from "react";
import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/lib/database.types";

export type ProfileStore = {
  state: ProfileContextState;
  dispatch: Dispatch<ProfileActionMap>;
};

export const initialContextState = {
  active_view: "profile",
  supabase_profile: {} as Profile | null,
  supabase_user: {} as User | null,
  favorites: {
    movie: [] as number[],
    tv: [] as number[],
  },
  active_favlist: "movie",
};

export const ProfileContext = createContext<ProfileStore>({ dispatch: () => {}, state: initialContextState });

function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) throw new Error("ProfileContext was used outside of the ProfileProvider");

  return context;
}

type ActionMap<M extends { [index: string]: unknown }> = {
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
    value: "profile" | "integrations";
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
    value: { media_type: "movie" | "tv"; id: number };
  };
  changed_active_favlist: {
    value: "movie" | "tv";
  };
};

export type ProfileContextState = typeof initialContextState;
export type ProfileActionMap = ActionMap<ProfilePayload>[keyof ActionMap<ProfilePayload>];

export { useProfile };
