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
      draft.where_to_watch.providers = services.filter((service) =>
        Object.prototype.hasOwnProperty.call(service.display_priorities, draft.where_to_watch.country)
      );
      draft.where_to_watch.providers.sort((a, b) => a.provider_name.localeCompare(b.provider_name));
      break;
    }
    // case 'added_provider': {
    //   draft.where_to_watch[action.payload.id] = action.payload.value;
    //   break;
    // }
    default: {
      throw Error('Unknown action');
    }
  }
};
