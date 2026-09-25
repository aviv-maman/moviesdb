import movieProviders from "@/lib/data/movie_providers.json";
import type { FormActionMap, FormContextState } from "./FormContext";

const { results: services } = movieProviders;

export const formReducer = (state: FormContextState, action: FormActionMap): FormContextState => {
  switch (action.type) {
    case "added_keyword": {
      return { ...state, keywords: [...state.keywords, { id: action.payload.id, value: action.payload.value }] };
    }
    case "deleted_keyword": {
      return { ...state, keywords: state.keywords.filter((keyword) => keyword.id !== action.payload.id) };
    }
    case "sort_by": {
      return { ...state, sort_by: action.payload.value };
    }
    case "changed_country": {
      const country = action.payload.value;
      const providers = services
        .filter((provider) => Object.hasOwn(provider.display_priorities, country))
        .map((provider) => ({ ...provider, is_selected: false }))
        .sort((a, b) => a.provider_name.localeCompare(b.provider_name));
      return { ...state, where_to_watch: { ...state.where_to_watch, country, providers } };
    }
    case "toggled_watch_providers": {
      return {
        ...state,
        where_to_watch: {
          ...state.where_to_watch,
          providers: state.where_to_watch.providers.map((provider) => ({
            ...provider,
            is_selected: !provider.is_selected,
          })),
        },
      };
    }
    case "show_me": {
      return { ...state, show_me: action.payload.value };
    }
    case "toggled_availability": {
      return { ...state, availabilities: action.payload.value };
    }
    case "toggled_release_dates": {
      return { ...state, release_dates: { ...state.release_dates, gte: action.payload.gte, lte: action.payload.lte } };
    }
    case "toggled_release_types": {
      return { ...state, release_types: action.payload.value };
    }
    case "toggled_genre": {
      return { ...state, genres: action.payload.value };
    }
    case "changed_language": {
      return { ...state, language: action.payload.value };
    }
    case "changed_user_score": {
      return { ...state, user_score: { ...state.user_score, min: action.payload.min, max: action.payload.max } };
    }
    default: {
      throw Error("Unknown action");
    }
  }
};
