import type { FC } from "react";
import { getMovies } from "@/lib/api_movie_lists";
import CatalogResults from "./CatalogResults";

interface PageResultsMoviesProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  type: "now_playing" | "popular" | "top_rated" | "upcoming";
}

const PageResultsMovies: FC<PageResultsMoviesProps> = async ({ searchParams, type = "popular" }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await getMovies({ ...(await searchParams), page: currentPage, type })) || {};

  return <CatalogResults results={results} page={page} total={total_pages || 1} />;
};

export default PageResultsMovies;
