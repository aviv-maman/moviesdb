'use client';
import { createContext, useContext, useMemo, type ReactNode, type Dispatch, useEffect } from 'react';
import { formReducer } from './formReducer';
import { useImmerReducer } from 'use-immer';
import { SHOW_ME, GENRES, SORT_BY, LANGUAGES } from '@/lib/data/search_filters';

export type FormStore = {
  state: FormContextState;
  dispatch: Dispatch<FormActionMap>;
};

const initialContextState = {
  sort_by: SORT_BY[0].value,
  where_to_watch: {
    country: '',
    providers: [{ provider_id: 0, provider_name: '', logo_path: '', display_priority: 0, is_selected: false }],
  },
  show_me: SHOW_ME[0].value,
  availabilities: ['all-availabilities'],
  release_dates: { gte: '', lte: '' },
  release_types: [0],
  genres: [...GENRES.map((option) => option.value)],
  language: LANGUAGES[0].value,
  user_score: { min: 0, max: 10 },
  keywords: [{ id: 0, value: '' }],
  minimum_votes: 0,
  with_runtime: { min: 0, max: 400 },
};

const FormContext = createContext<FormStore>({ dispatch: () => {}, state: initialContextState });

function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(formReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // TODO: Set the default country to the user's country
  useEffect(() => {
    dispatch({ type: 'changed_country', payload: { value: initialContextState.where_to_watch.country } });
  }, [dispatch]);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
}

function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) throw new Error('FormContext was used outside of the FormProvider');
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

type FormPayload = {
  sort_by: {
    value: string;
  };
  changed_country: {
    value: string;
  };
  toggled_watch_providers: {
    value: number[];
  };
  show_me: {
    value: string;
  };
  toggled_availability: {
    value: string[];
  };
  toggled_release_dates: {
    gte: string;
    lte: string;
  };
  toggled_release_types: {
    value: number[];
  };
  toggled_genre: {
    value: string[];
  };
  changed_language: {
    value: string;
  };
  changed_user_score: {
    min: number;
    max: number;
  };
  added_keyword: {
    id: number;
    value: string;
  };
  deleted_keyword: {
    id: number;
  };
  changed_minimum_votes: {
    value: number;
  };
  changed_runtime: {
    min: number;
    max: number;
  };
};

export type FormContextState = typeof initialContextState;
export type FormActionMap = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

export { FormProvider, useForm };
