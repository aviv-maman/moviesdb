import CatalogLayout from "@/components/CatalogLayout";
import PageResultsMoviesByType from "@/components/PageResultsMoviesByType";

export default async function UpcomingMoviesPage({ searchParams }: PageProps<"/movies/upcoming">) {
  return (
    <CatalogLayout media="movies" category="upcoming">
      <PageResultsMoviesByType searchParams={searchParams} type="upcoming" />
    </CatalogLayout>
  );
}
