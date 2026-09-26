import CatalogLayout from "@/components/CatalogLayout";
import PageResultsMoviesByType from "@/components/PageResultsMoviesByType";

export default async function TopRatedMoviesPage({ searchParams }: PageProps<"/movies/top-rated">) {
  return (
    <CatalogLayout media="movies" category="top-rated">
      <PageResultsMoviesByType searchParams={searchParams} type="top_rated" />
    </CatalogLayout>
  );
}
