"use client";

import { useEffect, useMemo, useReducer } from "react";
import { FormContext, initialContextState } from "./FormContext";
import { formReducer } from "./formReducer";

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  // TODO: Set the default country to the user's country
  useEffect(() => {
    dispatch({ type: "changed_country", payload: { value: initialContextState.where_to_watch.country } });
  }, []);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
}
