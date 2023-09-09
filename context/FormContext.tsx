'use client';

import { createContext, useContext, useMemo, type ReactNode, type Dispatch, useEffect } from 'react';
import { formReducer } from './formReducer';
import { useImmerReducer } from 'use-immer';

export type FormStore = {
  state: FormContextState;
  dispatch: Dispatch<FormActionMap>;
};

const initialContextState = {
  keywords: [{ id: 0, value: '' }],
  sort_by: 'popularity.desc',
  where_to_watch: { country: 'US', providers: [{ provider_id: 0, provider_name: '', logo_path: '', display_priority: 0, is_selected: false }] },
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
  added_keyword: {
    id: number;
    value: string;
  };
  deleted_keyword: {
    id: number;
  };
  sort_by: {
    value: string;
  };
  changed_country: {
    value: string;
  };
  toggled_provider: {
    provider_id: number;
  };
};

export type FormContextState = typeof initialContextState;
export type FormActionMap = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

export { FormProvider, useForm };
