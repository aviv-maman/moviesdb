import CatalogLayout from "@/components/CatalogLayout";
import PageResultsMovies from "@/components/PageResultsMovies";

export default async function PopularMoviesPage({ searchParams }: PageProps<"/movies/popular">) {
  return (
    <CatalogLayout media="movies" category="popular">
      <PageResultsMovies searchParams={searchParams} />
    </CatalogLayout>
  );
}
