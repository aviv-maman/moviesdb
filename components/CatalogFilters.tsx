"use client";

import type { FC } from "react";
import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Drawer } from "@heroui/react";
import { Search } from "@/assets/icons";
import { type FilterDates, FilterDraftContext, type FilterValues } from "@/context/FilterDraftContext";
import { AVAILABILITIES, MOVIE_GENRES, RELEASE_TYPES } from "@/lib/data/search_filters";
import ButtonCustom from "./ButtonCustom";
import SidebarFilters from "./SidebarFilters";
import SidebarSortBy from "./SidebarSortBy";
import SidebarWhereToWatch from "./SidebarWhereToWatch";

const CatalogFilters: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<FilterValues>(() => {
    const initial: FilterValues = {};
    searchParams.forEach((value, key) => {
      initial[key] = value.split(",");
    });
    initial.vote_average = [searchParams.get("vote_average.gte") || "0", searchParams.get("vote_average.lte") || "10"];
    initial.with_runtime = [searchParams.get("with_runtime.gte") || "0", searchParams.get("with_runtime.lte") || "360"];

    return initial;
  });
  const [dates, setDates] = useState<FilterDates>({});
  const formRef = useRef<HTMLFormElement>(null);
  function rememberValues() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const next: FilterValues = {};
    for (const key of data.keys()) next[key] = data.getAll(key).map(String);
    for (const key of [
      "with_genres",
      "with_watch_providers",
      "with_availabilities",
      "with_release_type",
      "with_keywords",
    ])
      next[key] ??= [];
    setValues(next);
  }
  function onOpenChange(open: boolean) {
    if (!open) rememberValues();
    setIsOpen(open);
  }
  function handleSearch(formData: FormData) {
    const params = new URLSearchParams(searchParams);
    const with_watch_providers = formData.getAll("with_watch_providers");
    const with_availabilities = formData.getAll("with_availabilities");
    const with_release_type = formData.getAll("with_release_type");
    const vote_average = formData.getAll("vote_average");
    const with_runtime = formData.getAll("with_runtime");
    const with_genres = formData.getAll("with_genres");
    const with_keywords = formData.getAll("with_keywords");
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (value === "") {
        params.delete(key);

        return;
      }
      if (key === "page") {
        params.delete(key);

        return;
      }
      if (key === "sort_by" && value === "popularity.desc") {
        params.delete(key);

        return;
      }
      if (key === "vote_count.gte" && value === "0") {
        params.delete(key);

        return;
      }
      if (key === "with_watch_providers") return;
      if (key === "with_availabilities") return;
      if (key === "with_release_type") return;
      if (key === "with_genres") return;
      if (key === "vote_average") return;
      if (key === "with_runtime") return;
      if (key === "with_keywords") return;
      if (key === "show_me") return;
      params.set(key, value.toString());
    });
    if (0 < with_watch_providers.length) {
      params.set("with_watch_providers", String(with_watch_providers));
    } else {
      params.delete("with_watch_providers");
    }
    if (with_availabilities[0] !== "all-availabilities" && with_availabilities.length !== AVAILABILITIES.length) {
      params.set("with_availabilities", String(with_availabilities));
    } else {
      params.delete("with_availabilities");
    }
    if (with_release_type[0] !== "0" && with_release_type.length !== RELEASE_TYPES.length) {
      params.set("with_release_type", String(with_release_type));
    } else {
      params.delete("with_release_type");
    }
    if (0 < with_genres.length && with_genres.length < MOVIE_GENRES.length) {
      params.set("with_genres", String(with_genres));
    } else {
      params.delete("with_genres");
    }
    if (Number(vote_average.at(0)) > 0) {
      params.set("vote_average.gte", String(vote_average.at(0)));
    } else {
      params.delete("vote_average.gte");
    }
    if (Number(vote_average.at(1)) < 10) {
      params.set("vote_average.lte", String(vote_average.at(1)));
    } else {
      params.delete("vote_average.lte");
    }
    if (Number(with_runtime.at(0)) > 0) {
      params.set("with_runtime.gte", String(with_runtime.at(0)));
    } else {
      params.delete("with_runtime.gte");
    }
    if (Number(with_runtime.at(1)) < 360) {
      params.set("with_runtime.lte", String(with_runtime.at(1)));
    } else {
      params.delete("with_runtime.lte");
    }
    if (0 < with_keywords.length && with_keywords[0] !== "") {
      params.set("with_keywords", String(with_keywords));
    } else {
      params.delete("with_keywords");
    }
    params.delete("page");
    rememberValues();
    setIsOpen(false);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <FilterDraftContext.Provider
      value={{ values, dates, setDate: (name, value) => setDates((previous) => ({ ...previous, [name]: value })) }}>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <Drawer.Trigger className="inline-flex items-center gap-2 rounded-lg border bg-surface px-4 py-2 text-sm font-medium hover:bg-default">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5">
            <path d="M4 7h16M4 17h16M8 4v6M16 14v6" />
          </svg>
          Filters & sort
        </Drawer.Trigger>
        <Drawer.Backdrop>
          <Drawer.Content placement="right">
            <Drawer.Dialog className="w-full max-w-[440px] rounded-none bg-surface p-0">
              <Drawer.Header className="relative border-b px-6 py-5">
                <Drawer.Heading className="text-xl font-semibold">Filters & sort</Drawer.Heading>
                <p className="mt-1 text-sm text-muted">Refine by genre, release date, and rating.</p>
                <Drawer.CloseTrigger aria-label="Close filters" className="absolute right-4 top-4" />
              </Drawer.Header>
              <form
                ref={formRef}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSearch(new FormData(event.currentTarget));
                }}
                className="flex min-h-0 flex-1 flex-col">
                <Drawer.Body className="filter-options min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5">
                  <SidebarSortBy />
                  <SidebarWhereToWatch />
                  <SidebarFilters />
                </Drawer.Body>
                <Drawer.Footer className="shrink-0 border-t bg-surface p-4">
                  <ButtonCustom type="submit" className="w-full rounded-lg" variant="primary">
                    <Search className="size-4" /> Search
                  </ButtonCustom>
                </Drawer.Footer>
              </form>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </FilterDraftContext.Provider>
  );
};

export default CatalogFilters;
