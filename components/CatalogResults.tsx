import type { MovieListResponse, SeriesListResponse } from "@/lib/api.types";
import CardGeneric from "./CardGeneric";
import PaginationCustom from "./PaginationCustom";

export default function CatalogResults({
  results,
  page,
  total,
}: {
  results?: (MovieListResponse["results"][0] | SeriesListResponse["results"][0])[];
  page?: number;
  total: number;
}) {
  return (
    <>
      {results?.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((data) => (
            <CardGeneric key={data.id} data={data} variant="catalog" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed px-6 py-20 text-center">
          <h2 className="text-xl font-semibold">No titles found</h2>
          <p className="mt-2 text-muted">Try adjusting your filters to see more results.</p>
        </div>
      )}
      {total > 1 && <PaginationCustom page={page} total={total} className="mt-10 flex justify-center border-t pt-6" />}
    </>
  );
}
