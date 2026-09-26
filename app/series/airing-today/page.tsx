import CatalogLayout from "@/components/CatalogLayout";
import PageResultsSeriesByType from "@/components/PageResultsSeriesByType";

export default async function AiringTodaySeriesPage({ searchParams }: PageProps<"/series/airing-today">) {
  return (
    <CatalogLayout media="series" category="airing-today">
      <PageResultsSeriesByType searchParams={searchParams} type="airing_today" />
    </CatalogLayout>
  );
}
