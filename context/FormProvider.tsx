"use client";

import { useEffect, useMemo } from "react";
import { useImmerReducer } from "use-immer";
import { FormContext, initialContextState } from "./FormContext";
import { formReducer } from "./formReducer";

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer(formReducer, initialContextState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // TODO: Set the default country to the user's country
  useEffect(() => {
    dispatch({ type: "changed_country", payload: { value: initialContextState.where_to_watch.country } });
  }, [dispatch]);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
}
