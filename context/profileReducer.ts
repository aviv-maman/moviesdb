import type { ProfileActionMap, ProfileContextState } from './ProfileContext';

export const profileReducer = (draft: ProfileContextState, action: ProfileActionMap) => {
  switch (action.type) {
    case 'changed_active_view': {
      draft.active_view = action.payload.value;
      break;
    }
    case 'changed_supabase_profile': {
      draft.supabase_profile = action.payload.value;
      break;
    }
    case 'changed_supabase_user': {
      draft.supabase_user = action.payload.value;
      break;
    }
    case 'changed_favorite_movie': {
      draft.favorites.movie = action.payload.value;
      break;
    }
    case 'changed_favorite_tv': {
      draft.favorites.tv = action.payload.value;
      break;
    }
    case 'toggled_favorite_item': {
      const { media_type, id } = action.payload.value;
      const favorites = draft.favorites[media_type];
      const index = favorites.findIndex((item) => item === id);
      if (index === -1) {
        favorites.push(id);
      } else {
        favorites.splice(index, 1);
      }
      draft.favorites[media_type] = favorites;
      break;
    }
    default: {
      throw Error('Unknown action');
    }
  }
};
