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
    default: {
      throw Error('Unknown action');
    }
  }
};
