import type { FC } from "react";
import { discoverMovies } from "@/lib/api_movie_lists";
import CatalogResults from "./CatalogResults";

interface PageResultsMoviesProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PageResultsMovies: FC<PageResultsMoviesProps> = async ({ searchParams }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await discoverMovies({ ...(await searchParams), page: currentPage })) || {};

  return <CatalogResults results={results} page={page} total={total_pages || 1} />;
};

export default PageResultsMovies;
