"use client";

import { createContext, useContext } from "react";
import type { DatePicker } from "@heroui/react";

export type FilterValues = Record<string, string[]>;
export type FilterDates = Record<string, DatePicker["Props"]["value"]>;
export const FilterDraftContext = createContext<{
  values: FilterValues;
  dates: FilterDates;
  setDate: (name: string, value: DatePicker["Props"]["value"]) => void;
}>({ values: {}, dates: {}, setDate: () => {} });

export function useFilterDraft() {
  return useContext(FilterDraftContext);
}
