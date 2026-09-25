import type { ProfileActionMap, ProfileContextState } from "./ProfileContext";

export const profileReducer = (state: ProfileContextState, action: ProfileActionMap): ProfileContextState => {
  switch (action.type) {
    case "changed_active_view": {
      return { ...state, active_view: action.payload.value };
    }
    case "changed_supabase_profile": {
      return { ...state, supabase_profile: action.payload.value };
    }
    case "changed_supabase_user": {
      return { ...state, supabase_user: action.payload.value };
    }
    case "changed_favorite_movie": {
      return { ...state, favorites: { ...state.favorites, movie: action.payload.value } };
    }
    case "changed_favorite_tv": {
      return { ...state, favorites: { ...state.favorites, tv: action.payload.value } };
    }
    case "toggled_favorite_item": {
      const { media_type, id } = action.payload.value;
      const favorites = state.favorites[media_type];
      const index = favorites.indexOf(id);
      const updatedFavorites =
        index === -1 ? [...favorites, id] : [...favorites.slice(0, index), ...favorites.slice(index + 1)];
      return { ...state, favorites: { ...state.favorites, [media_type]: updatedFavorites } };
    }
    case "changed_active_favlist": {
      return { ...state, active_favlist: action.payload.value };
    }
    default: {
      throw Error("Unknown action");
    }
  }
};
