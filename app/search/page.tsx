import { Suspense } from "react";
import LoadPageBtn from "@/components/LoadPageBtn";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultCardSkeleton from "@/components/SearchResultCardSkeleton";
import { type FilterOptions, filterSearch } from "@/lib/api_search";

const skeletonIds = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"];

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const awaitedSearchParams = await searchParams;
  const mediaType = firstParam(awaitedSearchParams.media_type);
  const year = firstParam(awaitedSearchParams.year);
  const filterParams: FilterOptions = {
    media_type: mediaType === "movie" || mediaType === "tv" || mediaType === "person" ? mediaType : "multi",
    query: firstParam(awaitedSearchParams.query),
    page: Number(firstParam(awaitedSearchParams.page)) || 1,
    language: firstParam(awaitedSearchParams.language),
    year: year ? Number(year) : undefined,
  };

  const searchData = await filterSearch(filterParams);

  return (
    <main className="animate-in min-h-[calc(100vh-162px)] w-full sm:min-h-[calc(100vh-154px)]">
      <SearchBar />
      <div className="mx-auto max-w-7xl p-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Search Results</h1>
              <span className="ml-1 h-4 w-16 animate-pulse rounded-lg bg-gray-300 shadow dark:bg-gray-600"></span>
            </div>
          }>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Search Results</h1>
            <span className="ml-1 rounded-md bg-blue-200 p-1 text-xs font-semibold text-blue-800">
              {searchData?.total_results} items
            </span>
          </div>
        </Suspense>
        <Suspense fallback={skeletonIds.map((id) => <SearchResultCardSkeleton key={id} />)}>
          {searchData?.results?.map((item) => (
            <SearchResultCard key={item.id} data={item} />
          ))}
          {searchData && searchData?.total_pages > 1 && (
            <div className="flex w-full justify-between">
              <LoadPageBtn label="Back" totalPages={searchData?.total_pages} />
              <LoadPageBtn label="Next" totalPages={searchData?.total_pages} />
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}
