'use client';

import { createContext, useContext, useMemo, type ReactNode, type Dispatch } from 'react';
import { formReducer } from './formReducer';
import { useImmerReducer } from 'use-immer';

export type FormStore = {
  state: FormContextState;
  dispatch: Dispatch<FormActionMap>;
};

const initialContextState = {
  keywords: [{ id: 0, value: '' }],
  sort_by: 'popularity.desc',
  where_to_watch: { country: 'US', providers: [{ id: 0, value: '' }] },
};

const FormContext = createContext<FormStore>({ dispatch: () => {}, state: initialContextState });

function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(formReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

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
  added_provider: {
    id: number;
    value: string;
  };
  deleted_provider: {
    id: number;
  };
};

export type FormContextState = typeof initialContextState;
export type FormActionMap = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

export { FormProvider, useForm };
