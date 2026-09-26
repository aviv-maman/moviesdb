import CatalogLayout from "@/components/CatalogLayout";
import PageResultsSeriesByType from "@/components/PageResultsSeriesByType";

export default async function TopRatedSeriesPage({ searchParams }: PageProps<"/series/top-rated">) {
  return (
    <CatalogLayout media="series" category="top-rated">
      <PageResultsSeriesByType searchParams={searchParams} type="top_rated" />
    </CatalogLayout>
  );
}
