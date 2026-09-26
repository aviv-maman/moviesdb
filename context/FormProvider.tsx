"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useMemo, useReducer } from "react";
import { FormContext, initialContextState } from "./FormContext";
import { formReducer } from "./formReducer";

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  // TODO: Set the default country to the user's country
  useEffect(() => {
    dispatch({ type: "changed_country", payload: { value: initialContextState.where_to_watch.country } });
  }, []);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};
