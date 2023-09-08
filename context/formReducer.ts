import type { FormActionMap, FormContextState } from './FormContext';

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
      break;
    }
    default: {
      throw Error('Unknown action');
    }
  }
};
