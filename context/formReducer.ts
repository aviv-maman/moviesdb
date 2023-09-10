import type { FormActionMap, FormContextState } from './FormContext';
import movieProviders from '@/lib/data/movie_providers.json';

const { results: services } = movieProviders;

export const formReducer = (draft: FormContextState, action: FormActionMap) => {
  switch (action.type) {
    case 'added_keyword': {
      draft.keywords.push({
        id: action.payload.id,
        value: action.payload.value,
      });
      break;
    }
    case 'deleted_keyword': {
      draft.keywords = draft.keywords.filter((keyword) => keyword.id !== action.payload.id);
      break;
    }
    case 'sort_by': {
      draft.sort_by = action.payload.value;
      break;
    }
    case 'changed_country': {
      draft.where_to_watch.country = action.payload.value;
      const mutatedServices = services.map((provider) => ({ ...provider, is_selected: false }));
      draft.where_to_watch.providers = mutatedServices.filter((service) =>
        Object.prototype.hasOwnProperty.call(service.display_priorities, draft.where_to_watch.country)
      );
      draft.where_to_watch.providers.sort((a, b) => a.provider_name.localeCompare(b.provider_name));
      break;
    }
    case 'toggled_provider': {
      const provider = draft.where_to_watch.providers.find((service) => service.provider_id === action.payload.provider_id);
      if (provider) provider.is_selected = !provider.is_selected;
      break;
    }
    case 'show_me': {
      draft.show_me = action.payload.value;
      break;
    }
    case 'toggled_availability': {
      draft.availabilities = action.payload.value;
      break;
    }
    case 'toggled_release_date': {
      draft.release_dates = action.payload.value;
      break;
    }
    case 'toggled_genre': {
      draft.genres = action.payload.value;
      break;
    }
    case 'changed_language': {
      draft.language = action.payload.value;
      break;
    }
    case 'changed_user_score': {
      draft.user_score.min = action.payload.min;
      draft.user_score.max = action.payload.max;
      break;
    }
    default: {
      throw Error('Unknown action');
    }
  }
};
