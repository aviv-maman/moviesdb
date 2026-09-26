import CatalogLayout from "@/components/CatalogLayout";
import PageResultsSeries from "@/components/PageResultsSeries";

export default async function PopularSeriesPage({ searchParams }: PageProps<"/series/popular">) {
  return (
    <CatalogLayout media="series" category="popular">
      <PageResultsSeries searchParams={searchParams} />
    </CatalogLayout>
  );
}
