import { getSeries } from "@/lib/api_series_lists";
import CatalogResults from "./CatalogResults";

interface PageResultsSeriesByTypeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  type: "airing_today" | "on_the_air" | "popular" | "top_rated";
}

const PageResultsSeriesByType: React.FC<PageResultsSeriesByTypeProps> = async ({ searchParams, type = "popular" }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await getSeries({ ...(await searchParams), page: currentPage, type })) || {};

  return <CatalogResults results={results} page={page} total={total_pages || 1} />;
};

export default PageResultsSeriesByType;
