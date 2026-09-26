import CatalogLayout from "@/components/CatalogLayout";
import PageResultsMoviesByType from "@/components/PageResultsMoviesByType";

export default async function NowPlayingMoviesPage({ searchParams }: PageProps<"/movies/now-playing">) {
  return (
    <CatalogLayout media="movies" category="now-playing">
      <PageResultsMoviesByType searchParams={searchParams} type="now_playing" />
    </CatalogLayout>
  );
}
