import CatalogLayout from "@/components/CatalogLayout";
import PageResultsSeriesByType from "@/components/PageResultsSeriesByType";

export default async function OnTheAirSeriesPage({ searchParams }: PageProps<"/series/on-the-air">) {
  return (
    <CatalogLayout media="series" category="on-the-air">
      <PageResultsSeriesByType searchParams={searchParams} type="on_the_air" />
    </CatalogLayout>
  );
}
